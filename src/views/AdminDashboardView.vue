<template>
  <section class="admin-dash">
    <div class="dash-header">
      <h1>Заявки с сайта <span v-if="stats.new > 0" class="badge-new">{{ stats.new }}</span></h1>
      <div class="header-actions">
        <span class="user-info">{{ currentUser?.login }} ({{ currentUser?.role === 'admin' ? 'Админ' : 'Менеджер' }})</span>
        <router-link to="/admin/settings" class="btn-settings">Настройки</router-link>
        <button class="btn-logout" @click="handleLogout">Выйти</button>
      </div>
    </div>

    <!-- Вкладки -->
    <div class="tabs">
      <button class="tab" :class="{ active: activeTab === 'leads' }" @click="switchTab('leads')">Заявки</button>
      <button class="tab" :class="{ active: activeTab === 'archive' }" @click="switchTab('archive')">Архив</button>
    </div>

    <template v-if="activeTab === 'leads'">
      <!-- Статистика -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">Всего заявок</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats.week }}</div>
          <div class="stat-label">За неделю</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ stats.month }}</div>
          <div class="stat-label">За месяц</div>
        </div>
        <div class="stat-card highlight">
          <div class="stat-value">{{ stats.new }}</div>
          <div class="stat-label">Новых</div>
        </div>
      </div>

      <!-- Фильтры -->
      <div class="filters">
        <select v-model="statusFilter" class="filter-select">
          <option value="all">Все статусы</option>
          <option value="new">Новые</option>
          <option value="in_progress">В работе</option>
          <option value="done">Завершённые</option>
        </select>

        <select v-model="dateFilter" class="filter-select">
          <option value="all">За всё время</option>
          <option value="today">Сегодня</option>
          <option value="week">За неделю</option>
          <option value="month">За месяц</option>
        </select>

        <select v-model="sourceFilter" class="filter-select">
          <option value="all">Все источники</option>
          <option v-for="src in sources" :key="src" :value="src">{{ src }}</option>
        </select>

        <select v-model="sortOrder" class="filter-select">
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
        </select>

        <button class="btn-export" @click="exportCSV">Экспорт CSV</button>
        <button class="btn-refresh" @click="loadData">↻ Обновить</button>
      </div>

      <div v-if="loading" class="empty">Загрузка заявок...</div>
      <div v-else-if="filteredLeads.length === 0" class="empty">Заявок не найдено</div>

      <div v-else class="leads-list">
        <div v-for="lead in filteredLeads" :key="lead.id" class="lead-card">
          <div class="lead-top">
            <span class="lead-name">{{ lead.name || 'Без имени' }}</span>
            <span class="lead-date">{{ lead.date }}</span>
          </div>
          <div class="lead-body">
            <div v-if="lead.phone"><b>Телефон:</b> {{ lead.phone }}</div>
            <div v-if="lead.message"><b>Сообщение:</b> {{ lead.message }}</div>
            <div v-if="lead.source"><b>Источник:</b> {{ lead.source }}</div>

            <!-- Данные калькулятора, если приложены -->
            <div v-if="lead.calculation" class="calc-attached">
              <div class="calc-title">Данные расчёта калькулятора</div>
              <div class="calc-row"><b>Глубина:</b> {{ lead.calculation.depth }} м</div>
              <div class="calc-row"><b>Диаметр трубы:</b> {{ lead.calculation.diameter }} мм</div>
              <div v-if="lead.calculation.extras?.length" class="calc-row">
                <b>Доп. услуги:</b> {{ lead.calculation.extras.join(', ') }}
              </div>
              <div class="calc-row calc-total"><b>Итоговая стоимость:</b> {{ lead.calculation.total?.toLocaleString('ru-RU') }} ₽</div>
            </div>
          </div>
          <div class="lead-actions">
            <select v-model="lead.status" @change="changeStatus(lead.id, lead.status)" class="status-select">
              <option value="new">Новая</option>
              <option value="in_progress">В работе</option>
              <option value="done">Завершена</option>
            </select>
            <button v-if="lead.status === 'done'" class="btn-archive" @click="askArchive(lead.id)">В архив</button>
            <button class="btn-del" @click="remove(lead.id)">Удалить</button>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <!-- Архив -->
      <div v-if="loadingArchive" class="empty">Загрузка архива...</div>
      <div v-else-if="archivedLeads.length === 0" class="empty">Архив пуст</div>
      <div v-else class="leads-list">
        <div v-for="lead in archivedLeads" :key="lead.id" class="lead-card archived">
          <div class="lead-top">
            <span class="lead-name">{{ lead.name || 'Без имени' }}</span>
            <span class="lead-date">{{ lead.date }}</span>
          </div>
          <div class="lead-body">
            <div v-if="lead.phone"><b>Телефон:</b> {{ lead.phone }}</div>
            <div v-if="lead.message"><b>Сообщение:</b> {{ lead.message }}</div>
            <div v-if="lead.source"><b>Источник:</b> {{ lead.source }}</div>
          </div>
          <div class="lead-actions">
            <button class="btn-unarchive" @click="restoreFromArchive(lead.id)">Вернуть из архива</button>
            <button class="btn-del" @click="remove(lead.id, true)">Удалить навсегда</button>
          </div>
        </div>
      </div>
    </template>

    <ConfirmModal
        :visible="confirmVisible"
        text="Перенести заявку в архив?"
        @confirm="confirmArchive"
        @cancel="confirmVisible = false"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getLeads, updateLeadStatus, deleteLead, getStats,
  archiveLead, unarchiveLead, getArchivedLeads
} from '@/utils/leads'
import { logout, getCurrentUser } from '@/utils/auth'
import ConfirmModal from '@/components/ConfirmModal.vue'

const router = useRouter()
const currentUser = ref(getCurrentUser())

const activeTab = ref('leads')
const leads = ref([])
const archivedLeads = ref([])
const stats = ref({ total: 0, week: 0, month: 0, new: 0, inProgress: 0, done: 0 })
const loading = ref(true)
const loadingArchive = ref(false)

const statusFilter = ref('all')
const dateFilter = ref('all')
const sourceFilter = ref('all')
const sortOrder = ref('newest')

const confirmVisible = ref(false)
const pendingArchiveId = ref(null)

async function loadData() {
  loading.value = true
  try {
    leads.value = await getLeads(false)
    stats.value = await getStats()
  } catch (e) {
    console.error('Ошибка загрузки заявок:', e)
  } finally {
    loading.value = false
  }
}

async function loadArchive() {
  loadingArchive.value = true
  try {
    archivedLeads.value = await getArchivedLeads()
  } catch (e) {
    console.error('Ошибка загрузки архива:', e)
  } finally {
    loadingArchive.value = false
  }
}

function switchTab(tab) {
  activeTab.value = tab
  if (tab === 'archive' && archivedLeads.value.length === 0) {
    loadArchive()
  }
}

onMounted(loadData)

const sources = computed(() => {
  const set = new Set(leads.value.map(l => l.source).filter(Boolean))
  return Array.from(set)
})

function getTimestamp(lead) {
  return lead.timestamp || 0
}

const filteredLeads = computed(() => {
  const now = Date.now()
  const day = 24 * 60 * 60 * 1000

  let result = leads.value.filter(lead => {
    if (statusFilter.value !== 'all' && lead.status !== statusFilter.value) return false
    if (sourceFilter.value !== 'all' && lead.source !== sourceFilter.value) return false

    if (dateFilter.value !== 'all') {
      const ts = getTimestamp(lead)
      if (dateFilter.value === 'today' && now - ts > day) return false
      if (dateFilter.value === 'week' && now - ts > 7 * day) return false
      if (dateFilter.value === 'month' && now - ts > 30 * day) return false
    }

    return true
  })

  result = [...result].sort((a, b) => {
    const ta = getTimestamp(a)
    const tb = getTimestamp(b)
    return sortOrder.value === 'newest' ? tb - ta : ta - tb
  })

  return result
})

async function changeStatus(id, status) {
  try {
    await updateLeadStatus(id, status)
    stats.value = await getStats()
  } catch (e) {
    console.error('Ошибка изменения статуса:', e)
  }
}

function askArchive(id) {
  pendingArchiveId.value = id
  confirmVisible.value = true
}

async function confirmArchive() {
  if (!pendingArchiveId.value) return
  try {
    await archiveLead(pendingArchiveId.value)
    await loadData()
  } catch (e) {
    console.error('Ошибка архивации:', e)
  } finally {
    confirmVisible.value = false
    pendingArchiveId.value = null
  }
}

async function restoreFromArchive(id) {
  try {
    await unarchiveLead(id)
    await loadArchive()
    await loadData()
  } catch (e) {
    console.error('Ошибка восстановления:', e)
  }
}

async function remove(id, fromArchive = false) {
  try {
    await deleteLead(id)
    if (fromArchive) {
      await loadArchive()
    } else {
      await loadData()
    }
  } catch (e) {
    console.error('Ошибка удаления заявки:', e)
  }
}

function exportCSV() {
  const headers = ['ID', 'Имя', 'Телефон', 'Сообщение', 'Источник', 'Статус', 'Дата']
  const statusLabels = { new: 'Новая', in_progress: 'В работе', done: 'Завершена' }

  const rows = filteredLeads.value.map(l => [
    l.id, l.name || '', l.phone || '',
    (l.message || '').replace(/[\n,]/g, ' '),
    l.source || '', statusLabels[l.status] || l.status, l.date
  ])

  const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function handleLogout() {
  logout()
  router.push('/admin')
}
</script>

<style scoped>
.admin-dash { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
.dash-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.dash-header h1 { font-size: 24px; font-weight: 800; color: var(--zag, #1E293B); display: flex; align-items: center; gap: 10px; }
.badge-new { background: #DC2626; color: white; font-size: 13px; font-weight: 700; border-radius: 12px; padding: 2px 10px; line-height: 1.4; }
.header-actions { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
.user-info { font-size: 13px; color: var(--tex, #475569); margin-right: 6px; }
.btn-settings { background: transparent; border: 1px solid var(--border, #E2E8F0); border-radius: 8px; padding: 8px 16px; cursor: pointer; font-weight: 600; font-size: 13px; color: var(--lazur, #2764AE); text-decoration: none; }
.btn-logout { background: transparent; border: 1px solid var(--border, #E2E8F0); border-radius: 8px; padding: 8px 16px; cursor: pointer; font-weight: 600; font-size: 13px; color: var(--tex, #475569); }

.tabs { display: flex; gap: 6px; margin-bottom: 20px; border-bottom: 1px solid var(--border, #E2E8F0); }
.tab { background: none; border: none; padding: 10px 18px; font-weight: 600; font-size: 14px; color: var(--tex, #475569); cursor: pointer; border-bottom: 2px solid transparent; }
.tab.active { color: var(--lazur, #2764AE); border-bottom-color: var(--lazur, #2764AE); }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
.stat-card { background: white; border: 1px solid var(--border, #E2E8F0); border-radius: 12px; padding: 18px; text-align: center; }
.stat-card.highlight { border-color: var(--lazur, #2764AE); background: rgba(39,100,174,0.04); }
.stat-value { font-size: 28px; font-weight: 800; color: var(--zag, #1E293B); }
.stat-card.highlight .stat-value { color: var(--lazur, #2764AE); }
.stat-label { font-size: 12px; color: var(--tex, #475569); margin-top: 4px; }

.filters { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; }
.filter-select { border: 1px solid var(--border, #E2E8F0); border-radius: 8px; padding: 8px 12px; font-size: 13px; font-family: inherit; background: white; cursor: pointer; }
.btn-export { background: var(--lazur, #2764AE); color: white; border: none; border-radius: 8px; padding: 8px 16px; cursor: pointer; font-weight: 600; font-size: 13px; }
.btn-refresh { background: transparent; border: 1px solid var(--border, #E2E8F0); border-radius: 8px; padding: 8px 14px; cursor: pointer; font-weight: 600; font-size: 13px; color: var(--lazur, #2764AE); }

.empty { text-align: center; color: var(--tex, #475569); padding: 60px 0; }
.leads-list { display: flex; flex-direction: column; gap: 14px; }
.lead-card { background: white; border: 1px solid var(--border, #E2E8F0); border-radius: 12px; padding: 18px 20px; }
.lead-card.archived { opacity: 0.85; background: #FAFAFA; }
.lead-top { display: flex; justify-content: space-between; margin-bottom: 10px; }
.lead-name { font-weight: 700; color: var(--zag, #1E293B); }
.lead-date { font-size: 12px; color: #94A3B8; }
.lead-body { font-size: 13px; color: var(--tex, #475569); line-height: 1.6; margin-bottom: 14px; }

.calc-attached { margin-top: 10px; background: rgba(39,100,174,0.05); border: 1px solid rgba(39,100,174,0.15); border-radius: 8px; padding: 10px 12px; }
.calc-title { font-weight: 700; color: var(--lazur, #2764AE); font-size: 12px; margin-bottom: 6px; }
.calc-row { font-size: 12px; margin-bottom: 2px; }
.calc-total { color: var(--lazur, #2764AE); font-weight: 700; margin-top: 4px; }

.lead-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.status-select { border: 1px solid var(--border, #E2E8F0); border-radius: 6px; padding: 6px 10px; font-size: 13px; font-family: inherit; }
.btn-archive { border: 1px solid #FCD34D; background: #FFFBEB; color: #92400E; border-radius: 6px; padding: 6px 12px; font-size: 13px; cursor: pointer; font-weight: 600; }
.btn-unarchive { border: 1px solid #93C5FD; background: #EFF6FF; color: #1E40AF; border-radius: 6px; padding: 6px 12px; font-size: 13px; cursor: pointer; font-weight: 600; }
.btn-del { border: 1px solid #FCA5A5; background: #FEF2F2; color: #DC2626; border-radius: 6px; padding: 6px 12px; font-size: 13px; cursor: pointer; font-weight: 600; }

@media (max-width: 640px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .filters { flex-direction: column; align-items: stretch; }
  .filter-select, .btn-refresh, .btn-export { width: 100%; }
}
</style>