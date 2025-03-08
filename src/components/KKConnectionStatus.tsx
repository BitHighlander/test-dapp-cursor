'use client';

import { Box, Circle } from '@chakra-ui/react';
import { ConnectionIndicator } from '@keepkey/connection-indicator';
import React, { useState } from 'react';

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
 * A Chakra UI styled connection status indicator for KeepKey Desktop
 */
export function KKConnectionStatus({ 
  size = 'md',
  connectionIndicatorProps 
}: KKConnectionStatusProps) {
  const [isConnected, setIsConnected] = useState(false);
  
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
  
  return (
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
        }}
        {...connectionIndicatorProps}
      />
    </Box>
  );
} 