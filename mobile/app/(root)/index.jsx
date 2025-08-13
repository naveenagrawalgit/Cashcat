import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from '@/component/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import PageLoader from '../../component/PageLoader'
import {styles} from '../../assets/styles/home.styles'
import {BalanceCard} from '../../component/BalanceCard'
import  {TransactionItem}  from '../../component/TransactionItem'
import NoTransactionsFound from '../../component/NoTransactionFound'


export default function Page() {
  const { user } = useUser()
  const router = useRouter()

  console.log(user?.emailAddresses[0]?.emailAddress.split("@")[0])
  const [refreshing,setRefreshing] = useState(false);


  const {transactions, summary,loading,loadData,deleteTransaction} = useTransactions(user.id)
   useEffect(()=>{
    loadData();
   },[loadData])


     const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

   const handleDelete = (id) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id) },
    ]);
  };

   if  (!refreshing &&   loading) return <PageLoader/>


  return (
    <View style={styles.container} >
      <View style={styles.content} >
        {/* header */}

        <View style={styles.header} >
          {/* left */}

          <View style={styles.headerLeft} >
            <Image 
            source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain" 
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>

          {/* right */}
           <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary= {summary} />

        
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

      </View>

      {/* FlatList is a performant way to render long lists in React Native. */}
      {/* it renders items lazily — only those on the screen. */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
        ListEmptyComponent={<NoTransactionsFound />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  )
}

