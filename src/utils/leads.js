import { db } from '@/firebase'
import {
    collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
    query, orderBy, where
} from 'firebase/firestore'

const leadsCollection = collection(db, 'leads')

export async function addLead(lead) {
    await addDoc(leadsCollection, {
        ...lead,
        status: 'new',
        archived: false,
        timestamp: Date.now(),
        date: new Date().toLocaleString('ru-RU')
    })
}

// Получить все заявки (не архивные, по умолчанию)
export async function getLeads(includeArchived = false) {
    const q = query(leadsCollection, orderBy('timestamp', 'desc'))
    const snapshot = await getDocs(q)
    const all = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    return includeArchived ? all : all.filter(l => !l.archived)
}

// Получить только архивные заявки
export async function getArchivedLeads() {
    const q = query(leadsCollection, orderBy('timestamp', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() })).filter(l => l.archived === true)
}

export async function updateLeadStatus(id, status) {
    const leadRef = doc(db, 'leads', id)
    await updateDoc(leadRef, { status })
}

export async function archiveLead(id) {
    const leadRef = doc(db, 'leads', id)
    await updateDoc(leadRef, { archived: true })
}

export async function unarchiveLead(id) {
    const leadRef = doc(db, 'leads', id)
    await updateDoc(leadRef, { archived: false })
}

export async function deleteLead(id) {
    const leadRef = doc(db, 'leads', id)
    await deleteDoc(leadRef)
}

export async function getStats() {
    const leads = await getLeads(false) // без архивных
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