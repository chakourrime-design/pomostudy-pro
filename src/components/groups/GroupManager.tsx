import { useState } from 'react'
import { useGroupStore } from '../../stores/groupStore'

export default function GroupManager() {
  const { groups, addGroup, addMember, removeMember, removeGroup } = useGroupStore()
  const [groupName, setGroupName] = useState('')
  const [memberInputs, setMemberInputs] = useState<Record<string, string>>({})

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className="flex gap-2">
        <input
          className="flex-1 bg-white/5 border border-white/10 rounded-lg
                     px-3 py-2 text-sm text-white placeholder-white/30
                     focus:outline-none focus:border-[#FF5F5F]/50"
          placeholder="Nom du groupe…"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && groupName.trim()) {
              addGroup(groupName.trim())
              setGroupName('')
            }
          }}
        />
        <button onClick={() => { addGroup(groupName.trim()); setGroupName('') }}
          className="px-3 py-2 rounded-lg bg-[#FF5F5F] text-white text-sm">
          +
        </button>
      </div>

      {groups.map((group) => (
        <div key={group.id}
          className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium text-sm">{group.name}</span>
            <button onClick={() => removeGroup(group.id)}
              className="text-white/30 hover:text-[#FF5F5F] text-xs">✕</button>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {group.members.map((m) => (
              <span key={m}
                className="flex items-center gap-1 bg-white/10 rounded-full
                           px-2 py-0.5 text-xs text-white/70">
                {m}
                <button onClick={() => removeMember(group.id, m)}
                  className="hover:text-[#FF5F5F]">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-white/5 border border-white/10 rounded-lg
                         px-2 py-1 text-xs text-white placeholder-white/30
                         focus:outline-none"
              placeholder="Ajouter un membre…"
              value={memberInputs[group.id] ?? ''}
              onChange={(e) => setMemberInputs((p) =>
                ({ ...p, [group.id]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addMember(group.id, memberInputs[group.id] ?? '')
                  setMemberInputs((p) => ({ ...p, [group.id]: '' }))
                }
              }}
            />
            <button onClick={() => {
                addMember(group.id, memberInputs[group.id] ?? '')
                setMemberInputs((p) => ({ ...p, [group.id]: '' }))
              }}
              className="px-2 py-1 rounded-lg bg-white/10
                         hover:bg-[#FF5F5F]/30 text-white text-xs">+</button>
          </div>
        </div>
      ))}
    </div>
  )
}