/**
 * Solution temporaire pour les farms
 * Utilise l'API de settings pour stocker les farms en attendant la correction du worker
 */

const API_URL = 'https://pharmhashv3.calitek-junior.workers.dev'

async function getFarmsFromSettings() {
  try {
    const response = await fetch(`${API_URL}/api/settings`)
    const settings = await response.json()
    return settings.farms || []
  } catch (error) {
    console.error('Erreur récupération farms depuis settings:', error)
    return []
  }
}

async function saveFarmsToSettings(farms) {
  try {
    const response = await fetch(`${API_URL}/api/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ farms })
    })
    return response.ok
  } catch (error) {
    console.error('Erreur sauvegarde farms vers settings:', error)
    return false
  }
}

async function addFarmTemporaire(name, description) {
  try {
    // Récupérer les farms existantes depuis l'API normale
    const response = await fetch(`${API_URL}/api/farms`)
    const existingFarms = await response.json()
    
    // Ajouter la nouvelle farm
    const newFarm = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date().toISOString()
    }
    
    const allFarms = [...existingFarms, newFarm]
    
    // Sauvegarder dans settings
    const success = await saveFarmsToSettings(allFarms)
    
    if (success) {
      console.log('✅ Farm ajoutée avec succès (solution temporaire)')
      return { success: true, farm: newFarm }
    } else {
      throw new Error('Erreur sauvegarde')
    }
  } catch (error) {
    console.error('Erreur ajout farm temporaire:', error)
    return { success: false, error: error.message }
  }
}

// Test
async function testSolution() {
  console.log('🧪 Test de la solution temporaire...')
  
  const result = await addFarmTemporaire('Farm Test Temporaire', 'Description test')
  console.log('Résultat:', result)
  
  const farms = await getFarmsFromSettings()
  console.log('Farms dans settings:', farms.length)
}

testSolution()