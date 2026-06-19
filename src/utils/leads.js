import { db } from '@/firebase'
import {
    collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
    query, orderBy, Timestamp
} from 'firebase/firestore'

const leadsCollection = collection(db, 'leads')

export async function addLead(lead) {
    await addDoc(leadsCollection, {
        ...lead,
        status: 'new',
        timestamp: Date.now(),
        date: new Date().toLocaleString('ru-RU')
    })
}

export async function getLeads() {
    const q = query(leadsCollection, orderBy('timestamp', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function updateLeadStatus(id, status) {
    const leadRef = doc(db, 'leads', id)
    await updateDoc(leadRef, { status })
}

export async function deleteLead(id) {
    const leadRef = doc(db, 'leads', id)
    await deleteDoc(leadRef)
}

export async function getStats() {
    const leads = await getLeads()
    const now = Date.now()
    const day = 24 * 60 * 60 * 1000

    const weekAgo = now - 7 * day
    const monthAgo = now - 30 * day

    return {
        total: leads.length,
        week: leads.filter(l => (l.timestamp || 0) >= weekAgo).length,
        month: leads.filter(l => (l.timestamp || 0) >= monthAgo).length,
        new: leads.filter(l => l.status === 'new').length,
        inProgress: leads.filter(l => l.status === 'in_progress').length,
        done: leads.filter(l => l.status === 'done').length
    }
}