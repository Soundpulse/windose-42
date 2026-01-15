
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../../constants';

const ProjectsApp: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-lg font-light text-white tracking-wide mb-1">Projects</h2>
          <p className="text-[10px] font-mono text-gray-600 tracking-wider">/root/projects/</p>
        </div>
        <div className="text-[9px] font-mono bg-white text-black px-3 py-1 tracking-wider">
          {PROJECTS.length} ITEMS
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className="group relative border border-gray-800 bg-black hover:border-white transition-all cursor-pointer"
          >
            {/* Image */}
            <div className="h-36 overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Tech tags */}
              <div className="absolute bottom-2 left-2 flex gap-1.5 flex-wrap">
                {project.tech.map(t => (
                  <span key={t} className="text-[8px] font-mono bg-black/80 text-gray-300 px-2 py-0.5 border border-gray-700 tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-light text-white tracking-wide">{project.title}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-600 hover:text-white">
                    <Github size={14} />
                  </button>
                  <button className="text-gray-600 hover:text-white">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-4 font-light">
                {project.description}
              </p>
              <button className="w-full py-2 border border-gray-800 text-[9px] font-mono uppercase tracking-widest text-gray-600 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                View Project
              </button>
            </div>
            
            {/* Index number */}
            <div className="absolute top-3 right-3 text-[10px] font-mono text-gray-700">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
