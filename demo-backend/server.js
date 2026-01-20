import express from "express";
import session from "express-session";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * ============================
 * Setup
 * ============================
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

/**
 * ============================
 * Helpers
 * ============================
 */
const readJSON = (file) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "data", file), "utf-8"));

const writeJSON = (file, data) =>
  fs.writeFileSync(
    path.join(__dirname, "data", file),
    JSON.stringify(data, null, 2)
  );

/**
 * ============================
 * Global Middleware
 * ============================
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/**
 * ============================
 * Session
 * ============================
 */
app.use(
  session({
    name: "e-voting.sid",
    secret: "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    },
  })
);

/**
 * ============================
 * REQUEST / RESPONSE LOGGER
 * ============================
 */
app.use((req, res, next) => {
  console.log("\n==============================");
  console.log("➡️  REQUEST");
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("Cookies:", req.headers.cookie || "None");
  console.log("Session:", req.session);
  console.log("Body:", req.body);

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    console.log("⬅️  RESPONSE");
    console.log("Status:", res.statusCode);
    console.log("Data:", data);
    console.log("==============================\n");
    return originalJson(data);
  };

  next();
});

/**
 * ============================
 * Guards
 * ============================
 */
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

const requireVerified = (req, res, next) => {
  if (!req.session.user.verified) {
    return res.status(403).json({ message: "Voter not verified" });
  }
  next();
};

/**
 * ============================
 * AUTH
 * ============================
 */
app.post("/api/auth/login", (req, res) => {
  const { voterId, password } = req.body;
  const voters = readJSON("voters.json").voters;

  const voter = voters.find(
    (v) => v.voterId === voterId && v.password === password
  );

  if (!voter) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = {
    voterId: voter.voterId,
    name: voter.name,
    province: voter.province,
    district: voter.district,
    constituency: voter.constituency,
    verified: voter.verified || false,
    hasVotedFPTP: voter.hasVotedFPTP || false,
    hasVotedPR: voter.hasVotedPR || false,
  };

  res.json(req.session.user);
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("e-voting.sid");
    res.json({ message: "Logged out" });
  });
});

app.get("/api/voter/profile", requireAuth, (req, res) => {
  res.json(req.session.user);
});

/**
 * ============================
 * REGISTRATION & VERIFICATION
 * ============================
 */
app.post("/api/voters/register", (req, res) => {
  const voters = readJSON("voters.json").voters;

  const voter = {
    ...req.body,
    verified: false,
    hasVotedFPTP: false,
    hasVotedPR: false,
    createdAt: new Date().toISOString(),
  };

  voters.push(voter);
  writeJSON("voters.json", { voters });

  res.status(201).json({ message: "Voter registered" });
});

app.post("/api/voters/:voterId/verify", (req, res) => {
  const voters = readJSON("voters.json").voters;
  const voter = voters.find((v) => v.voterId === req.params.voterId);

  if (!voter) return res.status(404).json({ message: "Voter not found" });

  voter.verified = true;
  writeJSON("voters.json", { voters });

  res.json({ message: "Voter verified" });
});

/**
 * ============================
 * VOTING CONTEXT
 * ============================
 */
app.get("/api/vote/context", requireAuth, (req, res) => {
  const u = req.session.user;
  res.json({
    verified: u.verified,
    canVoteFPTP: u.verified && !u.hasVotedFPTP,
    canVotePR: u.verified && !u.hasVotedPR,
  });
});

/**
 * ============================
 * CANDIDATES & PARTIES
 * ============================
 */
app.get("/api/candidates", requireAuth, (req, res) => {
  const candidates = readJSON("candidates.json").candidates;
  res.json(
    candidates.filter(
      (c) => c.constituency === req.session.user.constituency
    )
  );
});

app.get("/api/candidates/:region", requireAuth, (req, res) => {
  const candidates = readJSON("candidates.json").candidates;
  res.json(candidates.filter((c) => c.constituency === req.params.region));
});

app.get("/api/parties", requireAuth, (req, res) => {
  res.json(readJSON("parties.json").parties);
});

/**
 * ============================
 * VOTING
 * ============================
 */
app.post("/api/vote/submit", requireAuth, requireVerified, (req, res) => {
  const { voteType, candidateId, partyId } = req.body;

  const votesData = readJSON("votes.json");
  const voters = readJSON("voters.json").voters;

  const voter = voters.find(
    (v) => v.voterId === req.session.user.voterId
  );

  if (voteType === "FPTP" && voter.hasVotedFPTP)
    return res.status(400).json({ message: "Already voted FPTP" });

  if (voteType === "PR" && voter.hasVotedPR)
    return res.status(400).json({ message: "Already voted PR" });

  const voteEntry = {
    voterId: voter.voterId,
    voteType,
    candidateId: candidateId || null,
    partyId: partyId || null,
    timestamp: new Date().toISOString(),
  };

  if (voteType === "FPTP") {
    votesData.votes.fptp.push(voteEntry);
    voter.hasVotedFPTP = true;
  } else {
    votesData.votes.pr.push(voteEntry);
    voter.hasVotedPR = true;
  }

  writeJSON("votes.json", votesData);
  writeJSON("voters.json", { voters });

  req.session.user.hasVotedFPTP = voter.hasVotedFPTP;
  req.session.user.hasVotedPR = voter.hasVotedPR;

  res.json({ message: "Vote submitted" });
});

/**
 * ============================
 * RESULTS
 * ============================
 */
app.get("/api/results/summary", requireAuth, (req, res) => {
  const votesData = readJSON("votes.json");
  const fptpCount = votesData.votes.fptp.length;
  const prCount = votesData.votes.pr.length;
  res.json({
    totalVotes: fptpCount + prCount,
    fptpVotes: fptpCount,
    prVotes: prCount,
  });
});

/**
 * ============================
 * FALLBACK
 * ============================
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
