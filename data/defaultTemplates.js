const defaultTemplates = [
    {
        name: 'Scrum Project',
        description: 'Plan, prioritize, and schedule sprints using scrum framework',
        type: 'scrum',
        icon: 'speed',
        features: [
            'Sprint planning and tracking',
            'Backlog management',
            'Burndown charts',
            'Sprint retrospectives',
            'Story point estimation'
        ],
        defaultColumns: [
            { name: 'To Do', order: 1, wipLimit: 0 },
            { name: 'In Progress', order: 2, wipLimit: 3 },
            { name: 'Review', order: 3, wipLimit: 2 },
            { name: 'Done', order: 4, wipLimit: 0 }
        ],
        settings: {
            sprintDuration: 2,
            estimationType: 'story-points'
        },
        defaultIssueTypes: [
            { name: 'Story', icon: 'bookmark', color: '#36B37E' },
            { name: 'Bug', icon: 'bug_report', color: '#FF5630' },
            { name: 'Task', icon: 'check_circle', color: '#4C9AFF' }
        ],
        isDefault: true
    },
    {
        name: 'Kanban Project',
        description: 'Visualize work and maximize efficiency with a kanban board',
        type: 'kanban',
        icon: 'kanban',
        features: [
            'Flexible kanban boards',
            'Work in progress limits',
            'Continuous flow',
            'Real-time collaboration',
            'Custom workflows'
        ],
        defaultColumns: [
            { name: 'Backlog', order: 1, wipLimit: 0 },
            { name: 'Selected for Development', order: 2, wipLimit: 5 },
            { name: 'In Progress', order: 3, wipLimit: 3 },
            { name: 'Done', order: 4, wipLimit: 0 }
        ],
        settings: {
            columnLimit: 5
        },
        defaultIssueTypes: [
            { name: 'Task', icon: 'check_circle', color: '#4C9AFF' },
            { name: 'Bug', icon: 'bug_report', color: '#FF5630' },
            { name: 'Improvement', icon: 'trending_up', color: '#36B37E' }
        ],
        isDefault: true
    },
    {
        name: 'Project Management',
        description: 'Manage and track agile work plus integrate developer tools like GitHub',
        type: 'project-management',
        icon: 'project',
        features: [
            'Timeline and roadmap views',
            'Resource management',
            'GitHub integration',
            'Custom fields and workflows',
            'Advanced reporting'
        ],
        defaultColumns: [
            { name: 'To Do', order: 1, wipLimit: 0 },
            { name: 'In Progress', order: 2, wipLimit: 0 },
            { name: 'Review', order: 3, wipLimit: 0 },
            { name: 'Done', order: 4, wipLimit: 0 }
        ],
        settings: {
            githubIntegration: true
        },
        defaultIssueTypes: [
            { name: 'Task', icon: 'check_circle', color: '#4C9AFF' },
            { name: 'Bug', icon: 'bug_report', color: '#FF5630' },
            { name: 'Feature', icon: 'stars', color: '#36B37E' },
            { name: 'Epic', icon: 'flag', color: '#8777D9' }
        ],
        isDefault: true
    }
];

module.exports = defaultTemplates;
