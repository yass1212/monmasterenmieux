// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { Box, Container, Heading, Text, Spinner, useToast, Button, HStack, VStack, Collapse, IconButton, Table, Thead, Tbody, Tr, Th, Td, SimpleGrid } from '@chakra-ui/react'
// import { ChevronDownIcon, ChevronUpIcon, StarIcon } from '@chakra-ui/icons'
// import { useSearchParams } from 'react-router-dom'

// interface Etablissement {
//   id: string
//   uai: string
//   intitule: string
//   prive: boolean
//   siteWeb: string
//   handicapEmail: string
//   contactEmail: string
//   ville: string
//   departement: string
//   region: string
//   academie: string
// }

// interface Formation {
//   ifc: string
//   inm: string
//   intituleMention: string
//   inmp: string
//   intituleParcours: string
//   uai: string
//   modalitesEnseignement: string[]
//   candidatable: boolean
//   lieux: {
//     name: string
//     site: string
//     adresseChamp1: string
//     adresseChamp2: string
//     adresseChamp3: string
//     codePostal: string
//     ville: string
//     latLon: {
//       lat: number
//       lon: number
//     }
//     regionEtDepartement: string[]
//     villeEtrangere: boolean
//   }[]
//   alternance: boolean
//   motifsLibres: string[]
//   col: number
//   juryRectoral: boolean
//   urlSiteDroitsInscription?: string
//   indicateursAnneeDerniere?: {
//     tauxAcces: number
//     rangDernierAppele: number
//     nbCandidaturesConfirmees: number
//   }
//   lastModified: string
//   commentaire?: string
// }

// interface FormationsResponse {
//   content: Formation[]
//   totalPages: number
//   totalElements: number
//   size: number
//   number: number
//   numberOfElements: number
// }

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Formations from './pages/Formations'
import Etablissements from './pages/Etablissements'
import Favoris from './pages/Favoris'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Formations />} />
        <Route path="/etablissements" element={<Etablissements />} />
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </>
  )
}

export default App
