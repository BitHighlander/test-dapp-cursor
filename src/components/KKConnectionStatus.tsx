'use client';

import { Box, Circle, Badge, Text, VStack, HStack } from '@chakra-ui/react';
import { ConnectionIndicator } from '@keepkey/connection-indicator';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faLink, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export interface KKConnectionStatusProps {
  /**
   * Size of the indicator
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Additional props to pass to ConnectionIndicator
   */
  connectionIndicatorProps?: React.ComponentProps<typeof ConnectionIndicator>;
}

/**
 * An enhanced Chakra UI styled connection status indicator for KeepKey Desktop
 * with a dropdown showing additional status information
 */
export function KKConnectionStatus({ 
  size = 'md',
  connectionIndicatorProps 
}: KKConnectionStatusProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  
  const sizesMap = {
    sm: { dot: '8px', container: '16px' },
    md: { dot: '10px', container: '20px' },
    lg: { dot: '12px', container: '24px' },
  };
  
  const dimensions = sizesMap[size];
  const connectedColor = 'green.500';
  const disconnectedColor = 'red.500';
  
  // Custom indicators using Chakra UI
  const connectedIndicator = (
    <Circle size={dimensions.container} bg="transparent" border="1px solid" borderColor={connectedColor}>
      <Circle size={dimensions.dot} bg={connectedColor} />
    </Circle>
  );
  
  const disconnectedIndicator = (
    <Circle size={dimensions.container} bg="transparent" border="1px solid" borderColor={disconnectedColor}>
      <Circle size={dimensions.dot} bg={disconnectedColor} />
    </Circle>
  );
  
  // Format time since last check
  const formatTimeSince = () => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastChecked.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  };
  
  return (
    <Box position="relative">
      <Box 
        display="inline-flex" 
        p={2} 
        border="1px solid" 
        borderColor="gray.600" 
        borderRadius="md"
        cursor="pointer"
        _hover={{ bg: 'gray.700' }}
        position="relative"
        title={isConnected ? "KeepKey Desktop Connected" : "KeepKey Desktop Disconnected - Click to Launch"}
        onClick={() => setShowDetails(!showDetails)}
      >
        <ConnectionIndicator
          showTooltip={false}
          connectedIndicator={connectedIndicator}
          disconnectedIndicator={disconnectedIndicator}
          connectionOptions={{
            pollingInterval: 5000, // Check more frequently (every 5 seconds)
          }}
          onClick={(e, connected) => {
            setIsConnected(connected);
            setLastChecked(new Date());
            e.stopPropagation(); // Prevent triggering the parent box's onClick
          }}
          {...connectionIndicatorProps}
        />
      </Box>
      
      {/* Status details dropdown */}
      {showDetails && (
        <Box
          position="absolute"
          top="calc(100% + 5px)"
          right="0"
          width="250px"
          bg="gray.800"
          borderColor="gray.600"
          borderWidth="1px"
          borderRadius="md"
          p={3}
          zIndex={1000}
          boxShadow="0 4px 6px rgba(0,0,0,0.3)"
        >
          <VStack align="stretch" gap={3}>
            <HStack justifyContent="space-between">
              <Text fontWeight="bold">KeepKey Status</Text>
              <Badge colorScheme={isConnected ? "green" : "red"}>
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>
            </HStack>
            
            <HStack>
              <FontAwesomeIcon icon={faInfoCircle} />
              <Text fontSize="sm">Last checked: {formatTimeSince()}</Text>
            </HStack>
            
            {isConnected ? (
              <HStack>
                <FontAwesomeIcon icon={faLink} />
                <Text fontSize="sm">Connected and ready</Text>
              </HStack>
            ) : (
              <HStack>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <Text fontSize="sm">Click to launch KeepKey Desktop</Text>
              </HStack>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
} 