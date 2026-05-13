import { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Building2,
  TrendingUp,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  BarChart3,
  List,
  Grid3X3,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  ArrowUpDown,
  Eye,
  X,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
  AlertCircle,
  MessageSquare,
  CalendarDays,
  Activity,
  Globe,
  Linkedin,
  MapPin,
  DollarSign,
  UsersRound,
  Tag,
  FilterX,
  ChevronLeft,
  ChevronRight,
  Save,
  Clock3,
  Lock,
  LogOut,
  Shield
} from 'lucide-react';
import crmData from './data/crm_data.json';

// Login Component
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading
    setTimeout(() => {
      if (email === 'smartbuildlead@smartbuild.in' && password === 'Smartbuilds@143') {
        onLogin({ email, name: 'SmartBuild Lead Admin' });
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Lead CRM</h1>
            <p className="text-blue-200 text-sm">SmartBuild Sales Pipeline</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-100 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-6">
          Secure CRM System - SmartBuild Technologies
        </p>
      </div>
    </div>
  );
}

// Lead Detail Modal Component
function LeadDetailModal({ lead, onClose, onUpdate, onAddNote, onAddTask }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newNote, setNewNote] = useState('');
  const [newTask, setNewTask] = useState('');
  const [editingStage, setEditingStage] = useState(false);
  const [selectedStage, setSelectedStage] = useState(lead.stage || 'new');

  const stages = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote({
        id: Date.now(),
        text: newNote,
        timestamp: new Date().toISOString(),
        type: 'note'
      });
      setNewNote('');
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      onAddTask({
        id: Date.now(),
        text: newTask,
        timestamp: new Date().toISOString(),
        completed: false,
        type: 'task'
      });
      setNewTask('');
    }
  };

  const stageConfig = {
    new: { label: 'New', color: 'bg-gray-100 text-gray-700', icon: Circle },
    contacted: { label: 'Contacted', color: 'bg-blue-100 text-blue-700', icon: MessageSquare },
    qualified: { label: 'Qualified', color: 'bg-purple-100 text-purple-700', icon: CheckCircle },
    proposal: { label: 'Proposal', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
    negotiation: { label: 'Negotiation', color: 'bg-orange-100 text-orange-700', icon: Clock },
    won: { label: 'Won', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    lost: { label: 'Lost', color: 'bg-red-100 text-red-700', icon: X }
  };

  const currentStage = stageConfig[selectedStage] || stageConfig.new;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                {lead.fullName?.charAt(0) || '?'}
              </div>
              <div>
                <h2 className="text-xl font-bold">{lead.fullName || 'Unknown'}</h2>
                <p className="text-blue-100">{lead.title || 'No title'}</p>
                <p className="text-blue-100 text-sm">{lead.company || 'No company'}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mt-4">
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Email</span>
              </a>
            )}
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Call</span>
              </a>
            )}
            {lead.linkedin && (
              <a href={lead.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {['overview', 'activities', 'tasks', 'notes'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'notes' && lead.notes?.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{lead.notes.length}</span>
                )}
                {tab === 'tasks' && lead.tasks?.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">{lead.tasks.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Contact Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {lead.email && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email</span>
                      <span className="text-sm font-medium">{lead.email}</span>
                    </div>
                  )}
                  {lead.phone && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Phone</span>
                      <span className="text-sm font-medium">{lead.phone}</span>
                    </div>
                  )}
                  {(lead.city || lead.state) && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location</span>
                      <span className="text-sm font-medium">{[lead.city, lead.state].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                  {lead.country && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Country</span>
                      <span className="text-sm font-medium">{lead.country}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Company Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {lead.company && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Company</span>
                      <span className="text-sm font-medium">{lead.company}</span>
                    </div>
                  )}
                  {lead.industry && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Industry</span>
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {lead.industry}
                      </span>
                    </div>
                  )}
                  {lead.employees && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Employees</span>
                      <span className="text-sm font-medium">{Number(lead.employees).toLocaleString()}</span>
                    </div>
                  )}
                  {lead.revenue && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <span className="text-sm font-medium">${Number(lead.revenue).toLocaleString()}</span>
                    </div>
                  )}
                  {lead.website && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Website</span>
                      <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        Visit
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Stage Management */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Lead Stage
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  {editingStage ? (
                    <div className="flex flex-wrap gap-2">
                      {stages.map(stage => (
                        <button
                          key={stage}
                          onClick={() => setSelectedStage(stage)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedStage === stage
                              ? `${stageConfig[stage].color} ring-2 ring-blue-500 ring-offset-2`
                              : 'bg-white text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {stageConfig[stage].label}
                        </button>
                      ))}
                      <div className="w-full flex gap-2 mt-3">
                        <button
                          onClick={() => {
                            onUpdate({ ...lead, stage: selectedStage });
                            setEditingStage(false);
                          }}
                          className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingStage(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${currentStage.color}`}>
                        {currentStage.icon && <currentStage.icon className="w-4 h-4" />}
                        {currentStage.label}
                      </span>
                      <button
                        onClick={() => setEditingStage(true)}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" /> Change
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Additional Info
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {lead.source && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Source</span>
                      <span className="text-sm font-medium">{lead.source}</span>
                    </div>
                  )}
                  {lead.seniority && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Seniority</span>
                      <span className="text-sm font-medium">{lead.seniority}</span>
                    </div>
                  )}
                  {lead.funding && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Funding</span>
                      <span className="text-sm font-medium">${Number(lead.funding).toLocaleString()}</span>
                    </div>
                  )}
                  {lead.emailStatus && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email Status</span>
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {lead.emailStatus}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technologies */}
              {lead.technologies && (
                <div className="space-y-4 md:col-span-2">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Technologies
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex flex-wrap gap-2">
                      {lead.technologies.split(',').map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Keywords */}
              {lead.keywords && (
                <div className="space-y-4 md:col-span-2">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Tag className="w-4 h-4" /> Keywords
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex flex-wrap gap-2">
                      {lead.keywords.split(',').map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                          {kw.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Activity Timeline</h3>
              <div className="space-y-4">
                {lead.activities?.length > 0 ? lead.activities.map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-4">
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No activities recorded yet</p>
                    <p className="text-gray-400 text-sm">Activities will appear here as you interact with this lead</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Tasks</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {lead.tasks?.length > 0 ? lead.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        const updatedTasks = [...lead.tasks];
                        updatedTasks[i].completed = !updatedTasks[i].completed;
                        onUpdate({ ...lead, tasks: updatedTasks });
                      }}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600"
                    />
                    <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.text}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(task.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No tasks yet</p>
                    <p className="text-gray-400 text-sm">Add tasks to track follow-ups and actions</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Notes</h3>
              <div className="flex gap-2 mb-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note about this lead..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                />
                <button
                  onClick={handleAddNote}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 self-end"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {lead.notes?.length > 0 ? [...lead.notes].reverse().map((note, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{note.text}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(note.timestamp).toLocaleString()}
                    </p>
                  </div>
                )) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No notes yet</p>
                    <p className="text-gray-400 text-sm">Add notes to keep track of important information</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => {}} />;
  }
  return children;
}

// Sortable Header Component
function SortableHeader({ field, label, sortField, sortDirection, onSort }) {
  const isActive = sortField === field;
  return (
    <th
      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {label}
        <ArrowUpDown className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>
    </th>
  );
}

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState(crmData.leads);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const itemsPerPage = 25;

  const industries = ['all', ...crmData.industries];

  // Check for stored session
  useEffect(() => {
    const storedUser = localStorage.getItem('crm_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('crm_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('crm_user');
  };

  // Filter and sort leads
  const filteredLeads = useMemo(() => {
    let filtered = leads.filter(lead => {
      const matchesSearch = searchTerm === '' ||
        lead.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.title?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIndustry = industryFilter === 'all' || lead.industry === industryFilter;
      const matchesStatus = statusFilter === 'all' || lead.stage === statusFilter;

      return matchesSearch && matchesIndustry && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [leads, searchTerm, industryFilter, statusFilter, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleUpdateLead = (updatedLead) => {
    setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
    setSelectedLead(updatedLead);
  };

  const handleAddNote = (note) => {
    if (selectedLead) {
      const updatedLead = {
        ...selectedLead,
        notes: [...(selectedLead.notes || []), note]
      };
      handleUpdateLead(updatedLead);
    }
  };

  const handleAddTask = (task) => {
    if (selectedLead) {
      const updatedLead = {
        ...selectedLead,
        tasks: [...(selectedLead.tasks || []), task]
      };
      handleUpdateLead(updatedLead);
    }
  };

  // Stats
  const stats = useMemo(() => ({
    total: leads.length,
    byStage: leads.reduce((acc, lead) => {
      const stage = lead.stage || 'new';
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
    }, {}),
    byIndustry: Object.entries(
      leads.reduce((acc, lead) => {
        if (lead.industry) {
          acc[lead.industry] = (acc[lead.industry] || 0) + 1;
        }
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1]).slice(0, 10)
  }), [leads]);

  const stageConfig = {
    new: { label: 'New', color: 'bg-gray-500', bg: 'bg-gray-100', text: 'text-gray-700' },
    contacted: { label: 'Contacted', color: 'bg-blue-500', bg: 'bg-blue-100', text: 'text-blue-700' },
    qualified: { label: 'Qualified', color: 'bg-purple-500', bg: 'bg-purple-100', text: 'text-purple-700' },
    proposal: { label: 'Proposal', color: 'bg-yellow-500', bg: 'bg-yellow-100', text: 'text-yellow-700' },
    negotiation: { label: 'Negotiation', color: 'bg-orange-500', bg: 'bg-orange-100', text: 'text-orange-700' },
    won: { label: 'Won', color: 'bg-green-500', bg: 'bg-green-100', text: 'text-green-700' },
    lost: { label: 'Lost', color: 'bg-red-500', bg: 'bg-red-100', text: 'text-red-700' }
  };

  // Show login if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Lead CRM</h1>
                <p className="text-xs text-gray-500">Sales Pipeline Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live sync</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="stat-card">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500">Total Leads</p>
          </div>
          {Object.entries(stats.byStage).slice(0, 6).map(([stage, count]) => {
            const config = stageConfig[stage] || stageConfig.new;
            return (
              <div key={stage} className="stat-card">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                  <p className="text-xs text-gray-500">{config.label}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Industry Distribution Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Industry Distribution</h3>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
            {stats.byIndustry.slice(0, 5).map(([industry, count], i) => {
              const percentage = (count / stats.total) * 100;
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];
              return (
                <div
                  key={industry}
                  className={`${colors[i % colors.length]} h-full`}
                  style={{ width: `${percentage}%` }}
                  title={`${industry}: ${count}`}
                ></div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {stats.byIndustry.slice(0, 5).map(([industry, count], i) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];
              return (
                <div key={industry} className="flex items-center gap-2 text-xs">
                  <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`}></div>
                  <span className="text-gray-600">{industry}: {count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, email, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 min-w-[180px]"
              >
                <option value="all">All Industries</option>
                {crmData.industries.slice(0, 20).map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                {Object.keys(stageConfig).map(stage => (
                  <option key={stage} value={stage}>{stageConfig[stage].label}</option>
                ))}
              </select>
              {(industryFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
                <button
                  onClick={() => { setIndustryFilter('all'); setStatusFilter('all'); setSearchTerm(''); }}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 flex items-center gap-2"
                >
                  <FilterX className="w-4 h-4" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{paginatedLeads.length}</span> of{' '}
            <span className="font-semibold">{filteredLeads.length}</span> leads
            {filteredLeads.length !== leads.length && (
              <span className="ml-2 text-gray-400">(filtered from {leads.length} total)</span>
            )}
          </p>
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            >
              <List className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            >
              <Grid3X3 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Table View */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <SortableHeader field="fullName" label="Name" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
                    <SortableHeader field="title" label="Title" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
                    <SortableHeader field="company" label="Company" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
                    <SortableHeader field="industry" label="Industry" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
                    <SortableHeader field="email" label="Email" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
                    <SortableHeader field="stage" label="Stage" sortField={sortField} sortDirection={sortDirection} onSort={handleSort} />
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedLeads.map((lead) => {
                    const stage = stageConfig[lead.stage] || stageConfig.new;
                    return (
                      <tr key={lead.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                              {lead.fullName?.charAt(0) || '?'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{lead.fullName || 'N/A'}</p>
                              {lead.city && <p className="text-xs text-gray-500">{lead.city}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{lead.title || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{lead.company || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {lead.industry && (
                            <span className="inline-flex px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                              {lead.industry.length > 25 ? lead.industry.substring(0, 25) + '...' : lead.industry}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{lead.email || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${stage.bg} ${stage.text}`}>
                            <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
                            {stage.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {lead.email && (
                              <a href={`mailto:${lead.email}`} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Send Email">
                                <Mail className="w-4 h-4" />
                              </a>
                            )}
                            {lead.phone && (
                              <a href={`tel:${lead.phone}`} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Call">
                                <Phone className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedLeads.map((lead) => {
              const stage = stageConfig[lead.stage] || stageConfig.new;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {lead.fullName?.charAt(0) || '?'}
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${stage.bg} ${stage.text}`}>
                      <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
                      {stage.label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {lead.fullName || 'Unknown'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{lead.title || 'No title'}</p>
                  <div className="space-y-1.5 mt-3">
                    {lead.company && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{lead.company}</span>
                      </div>
                    )}
                    {lead.industry && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="truncate text-xs">{lead.industry}</span>
                      </div>
                    )}
                    {lead.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="truncate text-xs">{lead.email}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()} className="flex-1 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-1">
                        <Mail className="w-3 h-3" /> Email
                      </a>
                    )}
                    {lead.phone && (
                      <a href={`tel:${lead.phone}`} onClick={(e) => e.stopPropagation()} className="flex-1 py-2 px-3 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-1">
                        <Phone className="w-3 h-3" /> Call
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdateLead}
          onAddNote={handleAddNote}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
}

export default App;