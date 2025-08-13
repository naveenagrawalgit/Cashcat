import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'

import SafeScreen from "@/component/SafeScreen"

export default function RootLayout() {

  return (
    
  <SafeScreen>

    <ClerkProvider tokenCache={tokenCache}  >
      <Slot  />
    </ClerkProvider>
    
  </SafeScreen>
  )

}
