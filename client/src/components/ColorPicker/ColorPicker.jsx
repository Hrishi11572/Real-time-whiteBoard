export default function ColorPicker({ color, setColor}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      width: 'fit-content',
      fontFamily: 'sans-serif'
    }}>
      <input 
        type="color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)} 
        style={{ border: 'none', width: '40px', height: '40px', cursor: 'pointer' }}
      />
      <span style={{
        fontSize: '0.9rem',
        padding: '0.3rem 0.6rem',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}>
        {color}
      </span>
    </div>
  );
}
