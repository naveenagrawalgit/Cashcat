import { useClerk } from '@clerk/clerk-expo'
import { Alert, Text, TouchableOpacity } from 'react-native'
import {styles} from '../assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants/colors'
export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    Alert.alert("Logout", "want to log out?",[
      {text:"Cancel", style: "Cancel"},
      {text: "Logout", style:'destructive', onPress: signOut}
    ])
  }
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
      <Ionicons color={COLORS.text} size={20} name="log-out-outline" />
    </TouchableOpacity>
  )
}
