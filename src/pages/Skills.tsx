import { useState, useEffect } from 'react';
import projectData from '../data/project-data.json';

// Terminal text typing effect component
const TerminalText = ({ text, speed = 30, className = "" }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}<span className="animate-pulse">_</span>
    </div>
  );
};

// Database table visualization component
const SchemaTable = ({ name, isHighlighted = false }) => {
  return (
    <div
      className={`border ${isHighlighted ? 'border-cyan-400' : 'border-gray-700'} 
                 bg-gray-900 bg-opacity-60 p-2 text-xs whitespace-nowrap
                 transition-all duration-300`}
    >
      <div className={`${isHighlighted ? 'text-cyan-300' : 'text-gray-400'} uppercase mb-1 flex items-center`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isHighlighted ? 'bg-cyan-400' : 'bg-gray-600'} mr-1`}></span>
        {name}
      </div>
      <div className="h-px w-full bg-gray-700 mb-1"></div>
      <div className="text-gray-500 font-mono text-center text-xxs">TABLE</div>
    </div>
  );
};

// Project detail component
const ProjectDetail = ({ project, onClose, animationClass }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 ${animationClass}`}>
      <div className="bg-gray-900 border border-blue-800 rounded-sm p-1 w-full max-w-4xl max-h-[90vh] overflow-auto">
        {/* Header bar */}
        <div className="bg-gray-800 p-2 flex justify-between items-center border-b border-gray-700">
          <div className="text-xs text-cyan-400 font-mono">DATABASE.VIEW // {project.schema}</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            [x] CLOSE
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Project header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl text-cyan-400 font-bold">{project.title}</h2>
              <div className="text-xs font-mono bg-gray-800 px-2 py-1 rounded-sm border border-gray-700">
                ID: {project.id}
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-600 mb-3"></div>
            <p className="text-gray-300">{project.description}</p>
          </div>

          {/* Project metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 bg-opacity-50 border border-gray-700 p-3">
              <div className="text-gray-400 text-xs mb-2">STATUS</div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${project.status === 'COMPLETE' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                <div className={`text-sm ${project.status === 'COMPLETE' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {project.status.replace('_', ' ')}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 border border-gray-700 p-3">
              <div className="text-gray-400 text-xs mb-2">TIMESTAMP</div>
              <div className="text-white text-sm font-mono">
                {new Date(project.timestamp).toLocaleString()}
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 border border-gray-700 p-3">
              <div className="text-gray-400 text-xs mb-2">TECH STACK</div>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-900 bg-opacity-50 text-xs text-cyan-300 px-2 py-0.5 rounded-sm border border-blue-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 border border-gray-700 p-3">
              <div className="text-gray-400 text-xs mb-2">CONNECTIONS</div>
              <div className="text-gray-300 text-sm font-mono">
                {project.connections.join(' | ')}
              </div>
            </div>
          </div>

          {/* Schema visualization */}
          <div className="mb-6">
            <div className="text-sm text-cyan-400 mb-3 border-b border-gray-700 pb-1">
              DATABASE SCHEMA
            </div>

            <div className="bg-gray-950 border border-gray-800 p-4 rounded-sm">
              <div className="mb-4 overflow-x-auto">
                <div className="flex items-start space-x-6 pb-2">
                  {project.tables.map((table, index) => (
                    <SchemaTable key={index} name={table} isHighlighted={index === 0} />
                  ))}
                </div>

                {/* Schema connections visualization */}
                <div className="mt-8 border border-gray-800 p-3 bg-gray-900 bg-opacity-30">
                  <div className="text-xs text-gray-500 mb-2">SCHEMA RELATIONS</div>
                  <div className="font-mono text-xs text-gray-400 whitespace-pre">
                    {`${project.tables[0]} ──▶ ${project.tables[1]} [1:n]
${project.tables[0]} ──▶ ${project.tables[2]} [1:1]
${project.tables.length > 2 ? `${project.tables[1]} ──▶ ${project.tables[2]} [n:n]` : ''}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional features if available */}
          {project.features && (
            <div className="mb-6">
              <div className="text-sm text-cyan-400 mb-3 border-b border-gray-700 pb-1">
                FEATURES
              </div>
              <div className="bg-gray-950 border border-gray-800 p-4 rounded-sm">
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* SQL query example */}
          <div>
            <div className="text-sm text-cyan-400 mb-3 border-b border-gray-700 pb-1">
              SAMPLE QUERY
            </div>

            <div className="bg-black border border-gray-800 p-3 rounded-sm overflow-x-auto">
              <pre className="text-green-400 text-xs font-mono">
                {`SELECT p.project_id, p.name, t.tech_name, s.status
FROM projects p
JOIN project_tech pt ON p.project_id = pt.project_id
JOIN technologies t ON pt.tech_id = t.tech_id
JOIN status s ON p.status_id = s.status_id
WHERE p.schema = '${project.schema}'
ORDER BY p.timestamp DESC;`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
function Skills() {
  const [initialized, setInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showDetail, setShowDetail] = useState(false);
  const [animation, setAnimation] = useState("opacity-0");

  // Initialize the UI with a loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Handle project selection
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setShowDetail(true);
    setTimeout(() => setAnimation("opacity-100"), 10);
  };

  // Handle project detail close
  const handleCloseDetail = () => {
    setAnimation("opacity-0");
    setTimeout(() => {
      setShowDetail(false);
      setSelectedProject(null);
    }, 300);
  };

  // Filter projects based on search and active tab
  const filteredProjects = projectData.projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === "all" ||
      (activeTab === "active" && project.status === "IN_PROGRESS") ||
      (activeTab === "archived" && project.status === "COMPLETE") ||
      (activeTab === "pending" && project.status === "PENDING");

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen w-full bg-gray-950 text-gray-300 font-mono relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-schema-grid opacity-10 pointer-events-none"></div>

      {/* Initialization screen */}
      {!initialized ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-6 p-4">
          <div className="text-cyan-400 text-xl md:text-3xl font-bold">DATABASE INTERFACE INITIALIZING</div>

          <div className="w-full max-w-md p-3 border border-cyan-900 bg-black bg-opacity-50">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>SYSTEM/BOOT/DATABASE.SYS</span>
              <span className="animate-pulse">LOADING...</span>
            </div>
            <div className="text-green-500 text-sm">
              <TerminalText
                text={`> Initializing database connection\n> Loading schema definitions\n> Mounting project tables\n> Indexing content\n> Decrypting secure storage\n> Establishing secure connection\n> Preparing user interface components\n\n> Ready to access project database...`}
                speed={35}
              />
            </div>
          </div>

          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-loader rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="p-3 md:p-6 h-screen overflow-y-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-cyan-500 animate-pulse"></div>
              <div className="text-xl md:text-2xl font-bold text-cyan-400">PROJECT DATABASE</div>
              <div className="text-xs text-gray-500">SCHEMA_v3.2</div>
            </div>
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          </div>

          {/* Search and controls */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 text-xs">&gt;</span>
              </div>
              <input
                type="text"
                className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-sm focus:ring-cyan-500 focus:border-cyan-500 block p-2 pl-6"
                placeholder="SEARCH DATABASE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
              {["all", "active", "archived", "pending"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-1 text-xs border whitespace-nowrap ${activeTab === tab
                    ? "bg-cyan-900/30 border-cyan-500 text-cyan-400"
                    : "bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600"
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Database table display */}
          <div className="bg-gray-900 border border-gray-800 rounded-sm overflow-hidden mb-6">
            {/* Table header - Fixed */}
            <div className="bg-gray-800 text-gray-400 text-xs grid grid-cols-12 gap-2 p-2 border-b border-gray-700 sticky top-0 z-10">
              <div className="col-span-2">PROJECT ID</div>
              <div className="col-span-3">TITLE</div>
              <div className="col-span-3">SCHEMA</div>
              <div className="col-span-2">STATUS</div>
              <div className="col-span-2">ACTIONS</div>
            </div>

            {/* Table rows - Scrollable */}
            <div className="divide-y divide-gray-800 max-h-[50vh] overflow-y-auto">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="grid grid-cols-12 gap-2 p-3 text-sm hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => handleProjectSelect(project)}
                  >
                    <div className="col-span-2 font-mono text-cyan-300">{project.id}</div>
                    <div className="col-span-3 font-semibold text-gray-200">{project.title}</div>
                    <div className="col-span-3 text-gray-400 font-mono text-xs flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></span>
                      {project.schema}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${project.status === 'COMPLETE' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                        <div className={`text-xs ${project.status === 'COMPLETE' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {project.status.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-xs text-cyan-400 hover:text-cyan-300">
                      {/* Progress bar */}
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-700 h-1 rounded-full overflow-hidden mr-2">
                          <div
                            className="bg-cyan-500 h-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span>{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No projects match your search criteria.
                </div>
              )}
            </div>
          </div>

          {/* Database stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900 border border-gray-800 p-3">
              <div className="text-xs text-gray-500 mb-1">TOTAL ENTRIES</div>
              <div className="text-xl text-cyan-400 font-bold">{projectData.projects.length}</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-3">
              <div className="text-xs text-gray-500 mb-1">STORAGE USAGE</div>
              <div className="text-xl text-cyan-400 font-bold">2.7 GB</div>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-3">
              <div className="text-xs text-gray-500 mb-1">LAST UPDATE</div>
              <div className="text-xl text-cyan-400 font-bold">03:15:42</div>
            </div>
          </div>

          {/* Schema visualization */}
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-sm mb-6">
            <div className="text-sm text-cyan-400 mb-3 border-b border-gray-700 pb-1">
              CONNECTED DATABASE SCHEMA
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-6 min-w-max">
                <SchemaTable name="projects" isHighlighted={true} />
                <SchemaTable name="technologies" />
                <SchemaTable name="project_tech" />
                <SchemaTable name="project_status" />
                <SchemaTable name="users" />
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="bg-black border border-gray-800 p-3 mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>SYSTEM/TERMINAL</span>
              <span className="animate-pulse">READY</span>
            </div>
            <div className="text-green-500 text-sm">
              <TerminalText
                text="> Database connection established. Type 'help' for available commands."
                speed={15}
              />
            </div>
          </div>
        </div>
      )}

      {/* Project detail modal */}
      {showDetail && selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={handleCloseDetail}
          animationClass={`transition-opacity duration-300 ${animation}`}
        />
      )}

      {/* Global styles */}
      <style>{`
        @keyframes loader {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        .animate-loader {
          animation: loader 2.5s ease-in-out forwards;
        }
        
        .bg-schema-grid {
          background-size: 30px 30px;
          background-image: 
            linear-gradient(to right, rgba(2, 216, 252, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(2, 216, 252, 0.1) 1px, transparent 1px);
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .text-xxs {
          font-size: 0.65rem;
        }

        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.7);
        }
      `}</style>
    </div>
  );
}

export default Skills;