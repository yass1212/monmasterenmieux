import { useState } from 'react'
import axios from 'axios'
import { Box, Container, Heading, Text, Button, HStack, VStack, SimpleGrid, Spinner, useToast } from '@chakra-ui/react'

interface Etablissement {
  id: string
  uai: string
  intitule: string
  prive: boolean
  siteWeb: string
  handicapEmail: string
  contactEmail: string
  ville: string
  departement: string
  region: string
  academie: string
}

const Etablissements = () => {
  const [etablissements, setEtablissements] = useState<Etablissement[]>([])
  const [loading, setLoading] = useState(false)
  const [etablissementsLoaded, setEtablissementsLoaded] = useState(false)
  const toast = useToast()

  const fetchEtablissements = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/api/etablissements')
      setEtablissements(response.data)
      setEtablissementsLoaded(true)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les établissements',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="100%" px={4} py={8}>
      <VStack spacing={8} w="100%">
        <Box w="100%">
          <HStack mb={6} justify="space-between" align="center">
            <Heading>Liste des Établissements</Heading>
            {!etablissementsLoaded && (
              <Button
                onClick={fetchEtablissements}
                isLoading={loading}
              >
                Charger les établissements
              </Button>
            )}
          </HStack>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" width="100%">
              <Spinner size="xl" />
            </Box>
          ) : etablissementsLoaded ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {etablissements.map((etablissement) => (
                <Box
                  key={etablissement.id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  <Heading size="md" mb={2}>{etablissement.intitule}</Heading>
                  <Text><strong>UAI:</strong> {etablissement.uai}</Text>
                  <Text><strong>Type:</strong> {etablissement.prive ? 'Privé' : 'Public'}</Text>
                  <Text><strong>Ville:</strong> {etablissement.ville}</Text>
                  <Text><strong>Département:</strong> {etablissement.departement}</Text>
                  <Text><strong>Région:</strong> {etablissement.region}</Text>
                  <Text><strong>Académie:</strong> {etablissement.academie}</Text>
                  <Text><strong>Site web:</strong> <a href={etablissement.siteWeb} target="_blank" rel="noopener noreferrer">{etablissement.siteWeb}</a></Text>
                  <Text><strong>Email contact:</strong> <a href={`mailto:${etablissement.contactEmail}`}>{etablissement.contactEmail}</a></Text>
                  <Text><strong>Email handicap:</strong> <a href={`mailto:${etablissement.handicapEmail}`}>{etablissement.handicapEmail}</a></Text>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Text>Cliquez sur le bouton pour charger la liste des établissements</Text>
          )}
        </Box>
      </VStack>
    </Container>
  )
}

export default Etablissements