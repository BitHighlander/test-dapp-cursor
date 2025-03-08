'use client';

import { Box, Button, Flex, Heading, HStack, Image, useDisclosure } from '@chakra-ui/react';
import { KKConnectionStatus } from './KKConnectionStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faWallet, faExchangeAlt, faChartLine, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

/**
 * Main application header with navigation and KeepKey status
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: faChartLine },
    { name: 'Wallet', href: '/wallet', icon: faWallet },
    { name: 'Exchange', href: '/exchange', icon: faExchangeAlt },
    { name: 'Support', href: '/support', icon: faQuestionCircle },
  ];

  return (
    <Box 
      as="header" 
      height="60px" 
      bg="gray.800" 
      color="white" 
      borderBottom="1px solid" 
      borderColor="gray.700"
      position="sticky"
      top="0"
      zIndex="1000"
      width="100%"
      boxShadow="0 2px 10px rgba(0,0,0,0.3)"
    >
      <Flex 
        height="100%" 
        px={4} 
        alignItems="center" 
        justifyContent="space-between"
        maxWidth="1200px"
        mx="auto"
      >
        {/* Logo & Title */}
        <HStack gap={2}>
          <Image 
            src="/favicon.ico" 
            alt="KeepKey Logo" 
            height="24px" 
            width="24px"
          />
          <Heading as="h1" size="md">KeepKey Template</Heading>
        </HStack>
        
        {/* Desktop Navigation */}
        <HStack 
          gap={6} 
          display={{ base: 'none', md: 'flex' }}
        >
          {navItems.map((item) => (
            <Link href={item.href} key={item.name} passHref>
              <Button 
                as="a" 
                variant="ghost" 
                size="sm" 
                _hover={{ bg: 'gray.700' }}
              >
                <FontAwesomeIcon icon={item.icon} style={{ marginRight: '8px' }} />
                {item.name}
              </Button>
            </Link>
          ))}
        </HStack>
        
        {/* Mobile menu toggle */}
        <Button 
          display={{ base: 'flex', md: 'none' }}
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        
        {/* KeepKey Status */}
        <KKConnectionStatus size="md" />
      </Flex>
      
      {/* Mobile Navigation Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <Box 
          ref={mobileMenuRef}
          position="absolute" 
          top="60px" 
          left="0" 
          width="100%" 
          bg="gray.800" 
          borderBottom="1px solid" 
          borderColor="gray.700"
          boxShadow="0 4px 6px rgba(0,0,0,0.3)"
          zIndex="1000"
          display={{ base: 'block', md: 'none' }}
        >
          <Flex direction="column" p={4}>
            {navItems.map((item) => (
              <Link href={item.href} key={item.name} passHref>
                <Button 
                  as="a" 
                  variant="ghost" 
                  width="100%"
                  justifyContent="flex-start"
                  mb={2}
                  _hover={{ bg: 'gray.700' }}
                >
                  <FontAwesomeIcon icon={item.icon} style={{ marginRight: '8px' }} />
                  {item.name}
                </Button>
              </Link>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
} 