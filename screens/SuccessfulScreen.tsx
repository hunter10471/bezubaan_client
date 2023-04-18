import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {}

const SuccessfulScreen = (props: Props) => {
  return (
    <SafeAreaView>
    <View>
      <Text>SuccessfulScreen</Text>
    </View>
    </SafeAreaView>
  )
}

export default SuccessfulScreen

const styles = StyleSheet.create({})