import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Container, Heading, Text, Spinner, useToast, Button, HStack, VStack, Collapse, IconButton, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from '@chakra-ui/icons'
import { useSearchParams } from 'react-router-dom'
import SearchInput from '../components/SearchInput'

interface Formation {
  ifc: string
  inm: string
  intituleMention: string
  inmp: string
  intituleParcours: string
  uai: string
  modalitesEnseignement: string[]
  candidatable: boolean
  lieux: {
    name: string
    site: string
    adresseChamp1: string
    adresseChamp2: string
    adresseChamp3: string
    codePostal: string
    ville: string
    latLon: {
      lat: number
      lon: number
    }
    regionEtDepartement: string[]
    villeEtrangere: boolean
  }[]
  alternance: boolean
  motifsLibres: string[]
  col: number
  juryRectoral: boolean
  urlSiteDroitsInscription?: string
  indicateursAnneeDerniere?: {
    tauxAcces: number
    rangDernierAppele: number
    nbCandidaturesConfirmees: number
  }
  lastModified: string
  commentaire?: string
}

interface FormationsResponse {
  content: Formation[]
  totalPages: number
  totalElements: number
  size: number
  number: number
  numberOfElements: number
}

const Formations = () => {
  const [formations, setFormations] = useState<Formation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1') - 1
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [showFormations, setShowFormations] = useState(false)
  const [favoriteFormations, setFavoriteFormations] = useState<Formation[]>([])
  const pageSize = 100
  const toast = useToast()

  const fetchFormations = async (page: number) => {
    try {
      const response = await axios.post<FormationsResponse>(`http://localhost:3000/api/formations?page=${page}&size=${pageSize}`, {
        recherche: searchTerm
      })
      setFormations(response.data.content)
      setTotalPages(response.data.totalPages)
      setTotalElements(response.data.totalElements)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching formations:', error)
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les formations',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFormations(0)
    const savedFavorites = localStorage.getItem('favoriteFormations')
    if (savedFavorites) {
      setFavoriteFormations(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (formation: Formation) => {
    const isAlreadyFavorite = favoriteFormations.some(f => f.ifc === formation.ifc)
    let newFavorites: Formation[]
    
    if (isAlreadyFavorite) {
      newFavorites = favoriteFormations.filter(f => f.ifc !== formation.ifc)
      toast({
        title: 'Formation retirée des favoris',
        status: 'info',
        duration: 2000,
        isClosable: true,
      })
    } else {
      newFavorites = [...favoriteFormations, formation]
      toast({
        title: 'Formation ajoutée aux favoris',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
    
    setFavoriteFormations(newFavorites)
    localStorage.setItem('favoriteFormations', JSON.stringify(newFavorites))
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" width="100%">
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Container maxW="100%" px={4} py={8}>
      <VStack spacing={8} w="100%">
        <Box bg="blue.800" p={4} borderRadius="md" mb={4}>
          <Text fontSize="md" color="blue.100">
            ajoute les formations qui t'interessent aux favoris pour les comparer plus tard
          </Text>
        </Box>
        <Box w="100%" maxW="100vw" overflowX="auto">
          <HStack mb={6} justify="space-between" align="center">
            <Heading
            style={{
              marginLeft: '8px'
            }}
            >Liste des Formations</Heading>
            <Button
              aria-label="Toggle formations"
              onClick={() => setShowFormations(!showFormations)}
            >
              {showFormations ? 'Masquer tous les détails' : 'Afficher tous les détails'}
            </Button>
          </HStack>
          <HStack spacing={4} mb={4}>
            <Box width="100%">
                  <SearchInput 
                    value={searchTerm}
                    onChange={setSearchTerm}
                    onSearch={() => {
                      setSearchParams({ page: '1' })
                      fetchFormations(0)
                    }}
                  />
            </Box>
                <Button
                    onClick={() => {
                        setSearchParams({ page: '1' })
                        fetchFormations(0)
                    }}
                >
                    Rechercher
                </Button>
            </HStack>
                <Text mb={4}
                style={{
                  marginLeft: '8px'
                }}
                >
                    Affichage de {formations.length} résultats sur {totalElements} au total
                </Text>
            <Box mb={4} overflowX="auto" w="100%">
              <Table variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Favoris</Th>
                    <Th>Mention</Th>
                    <Th>Parcours</Th>
                    <Th>Lieu</Th>
                    <Th>Modalités</Th>
                    <Th>Alternance</Th>
                    <Th>Taux d'accès</Th>
                    <Th>Rang dernier appelé</Th>
                    <Th>Candidatures</Th>
                    <Th>Informations</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {formations.map((formation, index) => (
                    <Tr key={formation.ifc}>
                      <Td data-label="#">
                        {currentPage * pageSize + index + 1}
                      </Td>
                      <Td>
                        <IconButton
                          aria-label="Toggle favorite"
                          icon={<StarIcon color={favoriteFormations.some(f => f.ifc === formation.ifc) ? 'yellow.400' : 'gray.300'} />}
                          onClick={() => toggleFavorite(formation)}
                          size="sm"
                          variant="ghost"
                        />
                      </Td>
                      <Td data-label="Mention">
                        <Box overflow="hidden" position="relative">
                          <Collapse startingHeight={60} in={showFormations}>
                            {formation.intituleMention}
                          </Collapse>
                        </Box>
                      </Td>
                      <Td data-label="Parcours">
                        <Box overflow="hidden" position="relative">
                          <Collapse startingHeight={60} in={showFormations}>
                            {formation.intituleParcours}
                          </Collapse>
                        </Box>
                      </Td>
                      <Td data-label="Lieu">
                        <Box overflow="hidden" position="relative">
                          <Collapse startingHeight={60} in={showFormations}>
                            {formation.lieux.map((lieu, index) => (
                              <Box key={index} mb={2}>
                                <Text><strong>{lieu.site}</strong></Text>
                                <Text>{lieu.ville} ({lieu.codePostal})</Text>
                                <Text>{lieu.regionEtDepartement && lieu.regionEtDepartement.length > 0 ? lieu.regionEtDepartement[0] : '-'}</Text>
                              </Box>
                            ))}
                          </Collapse>
                        </Box>
                      </Td>
                      <Td>
                        <Box overflow="hidden" position="relative">
                          <Collapse startingHeight={60} in={showFormations}>
                            <Text>{formation.modalitesEnseignement.join(", ")}</Text>
                          </Collapse>
                        </Box>
                      </Td>
                      <Td data-label="Alternance">
                        {formation.alternance ? "Oui" : "Non"}
                      </Td>
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
                      <Td>
                        <Box overflow="hidden" position="relative">
                          <Collapse startingHeight={60} in={showFormations}>
                            {formation.commentaire && (
                              <Text fontStyle="italic" mb={2}>{formation.commentaire}</Text>
                            )}
                            {formation.urlSiteDroitsInscription && (
                              <a href={formation.urlSiteDroitsInscription} target="_blank" rel="noopener noreferrer">
                                Droits d'inscription
                              </a>
                            )}
                          </Collapse>
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
            <HStack justifyContent="center" mt={6} spacing={4}>
              <Button
                onClick={() => {
                  const newPage = currentPage - 1
                  setSearchParams({ page: (newPage + 1).toString() })
                  fetchFormations(newPage)
                }}
                isDisabled={currentPage === 0}
              >
                Page précédente
              </Button>
              <Text>Page {currentPage + 1} sur {totalPages}</Text>
              <Button
                onClick={() => {
                  const newPage = currentPage + 1
                  setSearchParams({ page: (newPage + 1).toString() })
                  fetchFormations(newPage)
                }}
                isDisabled={currentPage >= totalPages - 1}
              >
                Page suivante
              </Button>
            </HStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Formations