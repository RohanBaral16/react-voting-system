export interface LocationStructure {
  [provinceName: string]: {
    [districtName: string]: {
      [constituencyName: string]: string[];
    };
  };
}

export const locationData: LocationStructure = {
  "Koshi": {
    "Taplejung": { "Taplejung-1": [] },
    "Panchthar": { "Panchthar-1": [] },
    "Ilam": { "Ilam-1": [], "Ilam-2": [] },
    "Jhapa": { "Jhapa-1": [], "Jhapa-2": [], "Jhapa-3": [], "Jhapa-4": [], "Jhapa-5": [] },
    "Morang": {
      "Morang-1": [],
      "Morang-2": [],
      "Morang-3": [],
      "Morang-4": [],
      "Morang-5": [],
      "Morang-6": []
    },
    "Sunsari": {
      "Sunsari-1": [],
      "Sunsari-2": [],
      "Sunsari-3": [],
      "Sunsari-4": []
    },
    "Dhankuta": { "Dhankuta-1": [] },
    "Sankhuwasabha": { "Sankhuwasabha-1": [] },
    "Bhojpur": { "Bhojpur-1": [] },
    "Khotang": { "Khotang-1": [] },
    "Okhaldhunga": { "Okhaldhunga-1": [] },
    "Solukhumbu": { "Solukhumbu-1": [] },
    "Terhathum": { "Terhathum-1": [] },
    "Udayapur": { "Udayapur-1": [], "Udayapur-2": [] }
  },
  "Madhesh": {
    "Bara": { "Bara-1": [], "Bara-2": [], "Bara-3": [], "Bara-4": [] },
    "Dhanusha": { "Dhanusha-1": [], "Dhanusha-2": [], "Dhanusha-3": [], "Dhanusha-4": [] },
    "Mahottari": {
      "Mahottari-1": [],
      "Mahottari-2": [],
      "Mahottari-3": [],
      "Mahottari-4": []
    },
    "Parsa": { "Parsa-1": [], "Parsa-2": [], "Parsa-3": [], "Parsa-4": [] },
    "Rautahat": {
      "Rautahat-1": [],
      "Rautahat-2": [],
      "Rautahat-3": [],
      "Rautahat-4": []
    },
    "Saptari": {
      "Saptari-1": [],
      "Saptari-2": [],
      "Saptari-3": [],
      "Saptari-4": []
    },
    "Sarlahi": {
      "Sarlahi-1": [],
      "Sarlahi-2": [],
      "Sarlahi-3": [],
      "Sarlahi-4": []
    },
    "Siraha": {
      "Siraha-1": [],
      "Siraha-2": [],
      "Siraha-3": [],
      "Siraha-4": []
    }
  },
  "Bagmati": {
    "Kathmandu": {
      "Kathmandu-1": [], "Kathmandu-2": [], "Kathmandu-3": [], "Kathmandu-4": [],
      "Kathmandu-5": [], "Kathmandu-6": [], "Kathmandu-7": [], "Kathmandu-8": [],
      "Kathmandu-9": [], "Kathmandu-10": []
    },
    "Bhaktapur": { "Bhaktapur-1": [], "Bhaktapur-2": [] },
    "Lalitpur": { "Lalitpur-1": [], "Lalitpur-2": [], "Lalitpur-3": [] },
    "Chitwan": { "Chitwan-1": [], "Chitwan-2": [], "Chitwan-3": [] },
    "Dhading": { "Dhading-1": [], "Dhading-2": [] },
    "Dolakha": { "Dolakha-1": [] },
    "Kavrepalanchok": {
      "Kavrepalanchok-1": [],
      "Kavrepalanchok-2": []
    },
    "Makwanpur": { "Makwanpur-1": [], "Makwanpur-2": [] },
    "Nuwakot": { "Nuwakot-1": [], "Nuwakot-2": [] },
    "Ramechhap": { "Ramechhap-1": [] },
    "Rasuwa": { "Rasuwa-1": [] },
    "Sindhuli": { "Sindhuli-1": [], "Sindhuli-2": [] },
    "Sindhupalchok": {
      "Sindhupalchok-1": [],
      "Sindhupalchok-2": []
    }
  },
  "Gandaki": {
    "Baglung": { "Baglung-1": [], "Baglung-2": [] },
    "Gorkha": { "Gorkha-1": [], "Gorkha-2": [] },
    "Kaski": { "Kaski-1": [], "Kaski-2": [], "Kaski-3": [] },
    "Lamjung": { "Lamjung-1": [] },
    "Manang": { "Manang-1": [] },
    "Mustang": { "Mustang-1": [] },
    "Myagdi": { "Myagdi-1": [] },
    "Nawalpur": { "Nawalpur-1": [], "Nawalpur-2": [] },
    "Parbat": { "Parbat-1": [] },
    "Syangja": { "Syangja-1": [], "Syangja-2": [] },
    "Tanahun": { "Tanahun-1": [], "Tanahun-2": [] }
  },
  "Lumbini Province": {
    "Arghakhanchi": { "Arghakhanchi-1": [] },
    "Banke": { "Banke-1": [], "Banke-2": [], "Banke-3": [] },
    "Bardiya": { "Bardiya-1": [], "Bardiya-2": [] },
    "Dang": { "Dang-1": [], "Dang-2": [], "Dang-3": [] },
    "Gulmi": { "Gulmi-1": [], "Gulmi-2": [] },
    "Kapilvastu": {
      "Kapilvastu-1": [],
      "Kapilvastu-2": [],
      "Kapilvastu-3": []
    },
    "Palpa": { "Palpa-1": [], "Palpa-2": [] },
    "Pyuthan": { "Pyuthan-1": [] },
    "Rolpa": { "Rolpa-1": [] },
    "Rupandehi": {
      "Rupandehi-1": [], "Rupandehi-2": [], "Rupandehi-3": [],
      "Rupandehi-4": [], "Rupandehi-5": []
    },
    "Rukum East": { "Rukum East-1": [] },
    "Nawalparasi West": {
      "Nawalparasi West-1": [],
      "Nawalparasi West-2": []
    }
  },
  "Karnali": {
    "Dailekh": { "Dailekh-1": [], "Dailekh-2": [] },
    "Dolpa": { "Dolpa-1": [] },
    "Humla": { "Humla-1": [] },
    "Jajarkot": { "Jajarkot-1": [] },
    "Jumla": { "Jumla-1": [] },
    "Kalikot": { "Kalikot-1": [] },
    "Mugu": { "Mugu-1": [] },
    "Rukum West": { "Rukum West-1": [] },
    "Salyan": { "Salyan-1": [] },
    "Surkhet": { "Surkhet-1": [], "Surkhet-2": [] }
  },
  "Sudurpashchim": {
    "Achham": { "Achham-1": [], "Achham-2": [] },
    "Baitadi": { "Baitadi-1": [] },
    "Bajhang": { "Bajhang-1": [] },
    "Bajura": { "Bajura-1": [] },
    "Dadeldhura": { "Dadeldhura-1": [] },
    "Darchula": { "Darchula-1": [] },
    "Doti": { "Doti-1": [] },
    "Kailali": {
      "Kailali-1": [],
      "Kailali-2": [],
      "Kailali-3": [],
      "Kailali-4": [],
      "Kailali-5": []
    },
    "Kanchanpur": { "Kanchanpur-1": [], "Kanchanpur-2": [], "Kanchanpur-3": [] }
  }
} as const;
