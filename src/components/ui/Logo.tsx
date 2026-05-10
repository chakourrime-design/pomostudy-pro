
export function Logo() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      position: 'fixed',
      top: 20,
      left: 24,
      zIndex: 100
    }}>
      <img
        src="/Club-Logo.png"
        alt="Club Productivité ENSAB"
        style={{ width: 36, height: 36, borderRadius: 8 }}
      />
      <span style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: 16,
        letterSpacing: '-0.02em'
      }}>
        PomoStudy
      </span>
    </div>
  )
}