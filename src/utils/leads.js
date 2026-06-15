const STORAGE_KEY = 'bur52_leads'

export function getLeads() {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
}

export function addLead(lead) {
    const leads = getLeads()
    leads.unshift({
        id: Date.now(),
        date: new Date().toLocaleString('ru-RU'),
        timestamp: Date.now(),
        status: 'new',
        ...lead
    })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
}

export function updateLeadStatus(id, status) {
    const leads = getLeads().map(l => l.id === id ? { ...l, status } : l)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
}

export function deleteLead(id) {
    const leads = getLeads().filter(l => l.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
}

export function getNewLeadsCount() {
    return getLeads().filter(l => l.status === 'new').length
}

export function getStats() {
    const leads = getLeads()
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