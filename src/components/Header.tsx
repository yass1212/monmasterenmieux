import { Box, Container, HStack, Link, IconButton, useColorMode } from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

import './Header.css'

const Header = () => {
  const location = useLocation()
  const { colorMode, toggleColorMode } = useColorMode()

  const isActive = (path: string) => location.pathname === path

  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} py={4} mb={8} className="header">
      <Container maxW="100%" className="nav">
        <HStack spacing={8} justify="space-between">
          <HStack spacing={8}>
            <Link
              className="header-titre"
              as={RouterLink}
              to="/"
              fontWeight={isActive('/') ? 'bold' : 'normal'}
              color={isActive('/') ? 'blue.400' : colorMode === 'light' ? 'gray.700' : 'white'}
              _hover={{ color: colorMode === 'light' ? 'blue.600' : 'blue.300' }}
            >
              Formations
            </Link>
            <Link
              className="header-titre"
              as={RouterLink}
              to="/favoris"
              fontWeight={isActive('/favoris') ? 'bold' : 'normal'}
              color={isActive('/favoris') ? 'blue.400' : colorMode === 'light' ? 'gray.700' : 'white'}
              _hover={{ color: colorMode === 'light' ? 'blue.600' : 'blue.300' }}
            >
              Favoris
            </Link>
            <Link
              className="header-titre"
              as={RouterLink}
              to="/etablissements"
              fontWeight={isActive('/etablissements') ? 'bold' : 'normal'}
              color={isActive('/etablissements') ? 'blue.400' : colorMode === 'light' ? 'gray.700' : 'white'}
              _hover={{ color: colorMode === 'light' ? 'blue.600' : 'blue.300' }}
            >
              Établissements
            </Link>
          </HStack>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            colorScheme={colorMode === 'light' ? 'gray' : 'yellow'}
          />
        </HStack>
      </Container>
    </Box>
  )
}

export default Header