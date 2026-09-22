import React from "react";

const AboutApp: React.FC = () => {
  return (
    <div className="p-8 text-gray-200 leading-relaxed max-w-2xl mx-auto font-light">
      {/* Profile Header */}
      <div className="flex items-start gap-6 mb-10">
        <div className="relative">
          <img src="/icon.jpg" className="w-24 h-24 border border-gray-700 transition-all duration-500" alt="Profile" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white border border-gray-800" />
        </div>
        <div className="pt-2">
          <h1 className="text-2xl font-light text-white mb-2 tracking-wide">
            TOBY IO
            <span className="text-gray-600 ml-1" style={{ animation: "blink-cursor 1s infinite" }}>
              _
            </span>
          </h1>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider">
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-1.5 h-1.5 bg-white" />
              ACTIVE
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-300">LOS ANGELES, CA</span>
          </div>
          <div className="mt-2 text-[10px] font-mono tracking-wider text-gray-400">
            <span className="text-white">CONTACT:</span> toby.io@outlook.com
          </div>
        </div>
      </div>

      {/* Career Section */}
      <section className="mb-10">
        <h2 className="text-[10px] font-mono text-gray-400 border-b border-gray-800 mb-6 pb-2 tracking-[0.2em] uppercase">
          Career Log
        </h2>
        <div className="space-y-6 text-sm">
          <div className="flex gap-4">
            <div className="w-1 bg-white flex-shrink-0" />
            <div>
              <div className="text-white font-normal mb-1">
                Forward Deployed Engineer,{" "}
                <a href="https://taktora.ai" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Taktora Inc.
                </a>
              </div>
              <div className="text-[11px] text-gray-400 font-mono tracking-tight">2025.05 — 2026.05 · LOS ANGELES, CA</div>
              <div className="text-[10px] text-white mt-2 leading-relaxed">
                Built a multi-agent scheduler combining LLM agents with OR-Tools constraint solving, fed by
                edge-deployed vision streaming live counts and deviations. Deployed the MVP to 2 factories in California
                and cut weekly production replanning from 5 hours down to 30 minutes. <br />
                Deployed a real-time multimodal assistant (LiveKit, voice + vision on iPad) with RAG over machine
                manuals and SOPs, enabling non-technical floor operators to replace 10K+ page manual lookups with
                hands-free voice queries.
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-white opacity-60 flex-shrink-0" />
            <div>
              <div className="text-white font-normal mb-1">
                Founder & Technical Lead,{" "}
                <a href="https://chat.webbit-tech.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  Webbit Tech
                </a>
              </div>
              <div className="text-[11px] text-gray-400 font-mono tracking-tight">2023.06 — 2024.09 · MACAU</div>
              <div className="text-[10px] text-white mt-2 leading-relaxed">
                Led technical delivery of 20+ web platforms, analytics dashboards, and AI pipelines to enterprise
                clients including Hovione, Macau government agencies & various local and overseas Small and
                Medium-sized Enterprises. <br />
                Shipped a ComfyUI-based generative image pipeline using SDXL and custom LoRA fine-tuning to produce
                game assets and e-commerce product visuals, reducing asset turnaround from 3 days to 0.5 days. <br />
                Managed client engagements end to end, including SLA authoring and compliance reviews against each
                client’s own standards (pharma, gaming, government), scaling the team to 12 and HK$3M ARR in 12 months.
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-white opacity-40 flex-shrink-0" />
            <div>
              <div className="text-white font-normal mb-1">Data Scientist, Rainbow Seven Company Ltd.</div>
              <div className="text-[11px] text-gray-400 font-mono tracking-tight">2020.06 — 2024.01 · MACAU</div>
              <div className="text-[10px] text-white mt-2 leading-relaxed">
                Cut reporting from every two months to daily by consolidating 30+ one-off SQL queries into a single
                Python RPA extraction over a 40-table custom backend, feeding Power BI dashboards leadership could
                filter and drill on demand.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-10">
        <h2 className="text-[10px] font-mono text-gray-400 border-b border-gray-800 mb-6 pb-2 tracking-[0.2em] uppercase">
          Education Log
        </h2>
        <div className="space-y-6 text-sm">
          <div className="flex gap-4">
            <div className="w-1 bg-white flex-shrink-0" />
            <div>
              <div className="text-white font-normal mb-1">Cornell Tech, New York</div>
              <div className="text-[11px] text-gray-400 font-mono tracking-tight">
                Masters in Computer Science | 2024 — 2025 | GPA: 3.8
              </div>
              <div className="text-[10px] text-white mt-2 leading-relaxed">
                Thesis: LoRA-based Efficient 3D Style Transfer: Proposed reusable LoRA module for efficient NeRF style
                transfer. <br />
                Supervised by: Dr. Yu-Lun Liu & Dr. Hadar Averbuch-Elor <br />
                Extra: Student Rep & Ambassador; Teaching Assistant for Digital Marketing (NBAY 6060).
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-white opacity-40 flex-shrink-0" />
            <div>
              <div className="text-white font-normal mb-1">Newcastle University, UK</div>
              <div className="text-[11px] text-gray-400 font-mono tracking-tight">
                Bachelors in Computer Science | 2017 — 2020 | GPA: 3.8
              </div>
              <div className="text-[10px] text-white mt-2 leading-relaxed">
                Thesis: Feature Engineering for Data Mining: Automatic data redundancy elimination for compact
                analysis/viz. <br />
                Supervised by: Dr. Jaume Bacardit <br />
                Extra: 1st Class Honours; Student Rep & Ambassador; NCL+ Advanced Award; NUCATS.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="mb-10">
        <h2 className="text-[10px] font-mono text-gray-400 border-b border-gray-800 mb-6 pb-2 tracking-[0.2em] uppercase">
          Service Log
        </h2>
        <div className="space-y-6 text-sm">
          <div className="flex gap-4">
            <div className="w-1 bg-white flex-shrink-0" />
            <div>
              <div className="text-white font-normal mb-1">Student Mentor, Altitude Foundation</div>
              <div className="text-[11px] text-gray-400 font-mono tracking-tight">2019.10 — 2020.04</div>
              <div className="text-[10px] text-white mt-2 leading-relaxed">
                Non-profit improving access to tech education. <br />
                Mentored underprivileged youth in CS fundamentals; co-managed online tutoring programs to bridge the
                digital divide.
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-white opacity-60 flex-shrink-0" />
            <div>
              <div className="text-white font-normal mb-1">Presenter, Not-Equal Network</div>
              <div className="text-[11px] text-gray-400 font-mono tracking-tight">2018.11 — 2019.02</div>
              <div className="text-[10px] text-white mt-2 leading-relaxed">
                Social justice research network for digital society. <br />
                Facilitated digital ethics workshops for GCSE students; presented findings on data privacy at the London
                Launch Symposium.
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-white opacity-30 flex-shrink-0" />
            <div>
              <div className="text-white font-normal mb-1">Ex. Vice President, Knight of Hope</div>
              <div className="text-[11px] text-gray-400 font-mono tracking-tight">2012.09 — 2016.08</div>
              <div className="text-[10px] text-white mt-2 leading-relaxed">
                Community service and charitable organization in Macau. <br />
                Led nursing home charity visits and managed volunteer team operations for Yuet Wah College's outreach
                programs.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center border-t border-gray-900 pt-6">
        <p className="text-[9px] font-mono text-gray-500 tracking-[0.2em]">♡ SYSTEM_USER_PROFILE ♡</p>
      </div>
    </div>
  );
};

export default AboutApp;
