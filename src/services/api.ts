import axios from 'axios'
import type { AnalysisResult } from '../types'

const API_BASE_URL = 'http://localhost:8000/api'

export const analyzeContract = async (address: string): Promise<AnalysisResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze-contract`, {
      contract_address: address,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to analyze contract')
    }
    throw error
  }
}

export const getTokenAnalysis = async (address: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/token-analysis/${address}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to get token analysis')
    }
    throw error
  }
}

export const getGasAnalysis = async (address: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/gas-analysis/${address}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to get gas analysis')
    }
    throw error
  }
}

export const getContractHistory = async (address: string, days: number = 30) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/contract-history/${address}?days=${days}`
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to get contract history')
    }
    throw error
  }
} 