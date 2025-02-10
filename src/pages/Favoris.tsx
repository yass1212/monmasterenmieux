import { useState, useEffect } from 'react'
import { Box, Container, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

interface Formation {
  ifc: string
  intituleMention: string
  intituleParcours: string
  lieux: {
    site: string
    ville: string
    codePostal: string
    regionEtDepartement: string[]
  }[]
  modalitesEnseignement: string[]
  alternance: boolean
  indicateursAnneeDerniere?: {
    tauxAcces: number
    rangDernierAppele: number
    nbCandidaturesConfirmees: number
  }
}

const Favoris = () => {
  const [favoriteFormations, setFavoriteFormations] = useState<Formation[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteFormations')
    if (savedFavorites) {
      setFavoriteFormations(JSON.parse(savedFavorites))
    }
  }, [])

  const removeFavorite = (formation: Formation) => {
    const newFavorites = favoriteFormations.filter(f => f.ifc !== formation.ifc)
    setFavoriteFormations(newFavorites)
    localStorage.setItem('favoriteFormations', JSON.stringify(newFavorites))
  }

  return (
    <Container maxW="100%" px={4} py={8}>
      <Heading mb={6}>Comparaison des formations favorites</Heading>
      {favoriteFormations.length > 0 ? (
        <Box overflowX="auto">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Action</Th>
                <Th>Mention</Th>
                <Th>Parcours</Th>
                <Th>Lieu</Th>
                <Th>Modalités</Th>
                <Th>Alternance</Th>
                <Th>Taux d'accès</Th>
                <Th>Rang dernier appelé</Th>
                <Th>Candidatures</Th>
              </Tr>
            </Thead>
            <Tbody>
              {favoriteFormations.map((formation) => (
                <Tr key={formation.ifc}>
                  <Td>
                    <IconButton
                      aria-label="Remove from favorites"
                      icon={<StarIcon color="yellow.400" />}
                      onClick={() => removeFavorite(formation)}
                      size="sm"
                      variant="ghost"
                    />
                  </Td>
                  <Td>{formation.intituleMention}</Td>
                  <Td>{formation.intituleParcours}</Td>
                  <Td>
                    {formation.lieux.map((lieu, index) => (
                      <Box key={index} mb={2}>
                        <Text><strong>{lieu.site}</strong></Text>
                        <Text>{lieu.ville} ({lieu.codePostal})</Text>
                        <Text>{lieu.regionEtDepartement && lieu.regionEtDepartement.length > 0 ? lieu.regionEtDepartement[0] : '-'}</Text>
                      </Box>
                    ))}
                  </Td>
                  <Td>{formation.modalitesEnseignement.join(", ")}</Td>
                  <Td>{formation.alternance ? "Oui" : "Non"}</Td>
                  <Td>
                    {formation.indicateursAnneeDerniere ? 
                      `${(formation.indicateursAnneeDerniere.tauxAcces * 100).toFixed(1)}%` : 
                      '-'}
                  </Td>
                  <Td>
                    {formation.indicateursAnneeDerniere ? 
                      formation.indicateursAnneeDerniere.rangDernierAppele : 
                      '-'}
                  </Td>
                  <Td>
                    {formation.indicateursAnneeDerniere ? 
                      formation.indicateursAnneeDerniere.nbCandidaturesConfirmees : 
                      '-'}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <Text>Aucune formation favorite pour le moment. Ajoutez des formations aux favoris depuis la page des formations.</Text>
      )}
    </Container>
  )
}

export default Favoris