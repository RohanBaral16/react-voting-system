

export interface LocationStructure{
    [provinceName: string]: {
        [districtName: string]:{
            [constituencyName: string]: string[]
        }
    }
}

export const locationData : LocationStructure = {
  "Province 1": {
    Kathmandu: {
      "Kathmandu-1": ["PS-001", "PS-002", "PS-003"],
      "Kathmandu-2": ["PS-004", "PS-005"]
    },
    Bhaktapur: {
      "Bhaktapur-1": ["PS-006", "PS-007"],
      "Bhaktapur-2": ["PS-008"]
    },
    Lalitpur: {
      "Lalitpur-1": ["PS-009", "PS-010"],
      "Lalitpur-2": ["PS-011"]
    }
  },
  "Province 2": {
    Pokhara: {
      "Pokhara-1": ["PS-101", "PS-102"],
      "Pokhara-2": ["PS-103"]
    },
    Baglung: {
      "Baglung-1": ["PS-104", "PS-105", "PS-106"],
      "Baglung-2": ["PS-107"]
    },
    Mustang: {
      "Mustang-1": ["PS-108"],
      "Mustang-2": ["PS-109", "PS-110"]
    }
  },
  "Province 3": {
    Biratnagar: {
      "Biratnagar-1": ["PS-201", "PS-202"],
      "Biratnagar-2": ["PS-203", "PS-204"]
    },
    Dharan: {
      "Dharan-1": ["PS-205", "PS-206"],
      "Dharan-2": ["PS-207"]
    },
    Jhapa: {
      "Jhapa-1": ["PS-208", "PS-209", "PS-210"]
    }
  },
  "Province 4": {
    Butwal: {
      "Butwal-1": ["PS-301", "PS-302"],
      "Butwal-2": ["PS-303"]
    },
    Tansen: {
      "Tansen-1": ["PS-304", "PS-305"],
      "Tansen-2": ["PS-306"]
    },
    Rolpa: {
      "Rolpa-1": ["PS-307"],
      "Rolpa-2": ["PS-308", "PS-309"]
    }
  },
  "Province 5": {
    Nepalgunj: {
      "Nepalgunj-1": ["PS-401", "PS-402"],
      "Nepalgunj-2": ["PS-403"]
    },
    Butwal: {
      "Butwal-3": ["PS-404", "PS-405"]
    }
  },
  "Province 6": {
    Surkhet: {
      "Surkhet-1": ["PS-501", "PS-502"],
      "Surkhet-2": ["PS-503", "PS-504"]
    },
    Dailekh: {
      "Dailekh-1": ["PS-505", "PS-506"]
    }
  },
  "Province 7": {
    Dhangadhi: {
      "Dhangadhi-1": ["PS-601", "PS-602"],
      "Dhangadhi-2": ["PS-603"]
    },
    Tikapur: {
      "Tikapur-1": ["PS-604"],
      "Tikapur-2": ["PS-605", "PS-606"]
    }
  }
} as const;

