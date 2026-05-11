import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useGroupStore } from '../../stores/groupStore';
export default function GroupManager() {
    const { groups, addGroup, addMember, removeMember, removeGroup } = useGroupStore();
    const [groupName, setGroupName] = useState('');
    const [memberInputs, setMemberInputs] = useState({});
    return (_jsxs("div", { className: "flex flex-col gap-4 p-1", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "flex-1 bg-white/5 border border-white/10 rounded-lg\r\n                     px-3 py-2 text-sm text-white placeholder-white/30\r\n                     focus:outline-none focus:border-[#FF5F5F]/50", placeholder: "Nom du groupe\u2026", value: groupName, onChange: (e) => setGroupName(e.target.value), onKeyDown: (e) => {
                            if (e.key === 'Enter' && groupName.trim()) {
                                addGroup(groupName.trim());
                                setGroupName('');
                            }
                        } }), _jsx("button", { onClick: () => { addGroup(groupName.trim()); setGroupName(''); }, className: "px-3 py-2 rounded-lg bg-[#FF5F5F] text-white text-sm", children: "+" })] }), groups.map((group) => (_jsxs("div", { className: "bg-white/5 border border-white/10 rounded-xl p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-white font-medium text-sm", children: group.name }), _jsx("button", { onClick: () => removeGroup(group.id), className: "text-white/30 hover:text-[#FF5F5F] text-xs", children: "\u2715" })] }), _jsx("div", { className: "flex flex-wrap gap-1 mb-2", children: group.members.map((m) => (_jsxs("span", { className: "flex items-center gap-1 bg-white/10 rounded-full\r\n                           px-2 py-0.5 text-xs text-white/70", children: [m, _jsx("button", { onClick: () => removeMember(group.id, m), className: "hover:text-[#FF5F5F]", children: "\u00D7" })] }, m))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "flex-1 bg-white/5 border border-white/10 rounded-lg\r\n                         px-2 py-1 text-xs text-white placeholder-white/30\r\n                         focus:outline-none", placeholder: "Ajouter un membre\u2026", value: memberInputs[group.id] ?? '', onChange: (e) => setMemberInputs((p) => ({ ...p, [group.id]: e.target.value })), onKeyDown: (e) => {
                                    if (e.key === 'Enter') {
                                        addMember(group.id, memberInputs[group.id] ?? '');
                                        setMemberInputs((p) => ({ ...p, [group.id]: '' }));
                                    }
                                } }), _jsx("button", { onClick: () => {
                                    addMember(group.id, memberInputs[group.id] ?? '');
                                    setMemberInputs((p) => ({ ...p, [group.id]: '' }));
                                }, className: "px-2 py-1 rounded-lg bg-white/10\r\n                         hover:bg-[#FF5F5F]/30 text-white text-xs", children: "+" })] })] }, group.id)))] }));
}
