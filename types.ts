import React from "react";

export type AppID =
  | "about"
  | "projects"
  | "terminal"
  | "stats"
  | "chat"
  | "settings"
  | "go_out"
  | "achievements"
  | "stack"
  | "stream"
  | "project_view";

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: React.ReactNode;
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
}

export type ProjectStatus = "LIVE" | "ARCHIVED" | "MVP" | "PROTOTYPE" | "RESEARCH";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  link: string;
  image: string;
  media?: ProjectMedia[];
  status: ProjectStatus;
}
