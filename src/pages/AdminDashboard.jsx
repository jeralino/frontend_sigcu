import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

function AdminPanel() {
  const navigate = useNavigate(); 
  const [usuarios, setUsuarios] = useState([]);
  const [userId, setUserId] = useState("");
  const [monto, setMonto] = useState("");

  const token = localStorage.getItem("token"); 

  // --- 1. DEFINIMOS LA FUNCIÓN DE CARGA FUERA DEL USEEFFECT ---
  // Esto nos permite llamarla cuando queramos (al iniciar y al recargar)
  const obtenerUsuarios = () => {
    fetch("http://localhost:4000/api/admin/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
            setUsuarios(data);
        } else {
            console.error("El servidor no devolvió una lista:", data);
            setUsuarios([]); 
        }
      })
      .catch(err => console.error(err));
  };

  // --- 2. CARGA INICIAL ---
  useEffect(() => {
    if (!token) {
        navigate('/login');
        return;
    }
    obtenerUsuarios(); // Llamamos a la función al cargar la página
  }, [token, navigate]);

  const recargar = async () => {
    if (!userId || !monto) {
      alert("Seleccione usuario y monto");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/admin/recargar", {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ userId, monto })
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(data.message || "Recarga exitosa");
        setMonto(""); // Limpiamos el campo de monto
        
        // --- 3. EL TRUCO: ACTUALIZAMOS LA LISTA AUTOMÁTICAMENTE ---
        obtenerUsuarios(); 
      } else {
        alert(data.error || "Error al recargar");
      }
      
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de Administrador</h1>

      <h2>Usuarios registrados:</h2>
      {usuarios.length === 0 ? (
          <p>Cargando usuarios o no hay datos disponibles...</p>
      ) : (
          <select
            onChange={e => setUserId(e.target.value)}
            value={userId} // Vinculamos el select al estado
            style={{ width: "300px", padding: "10px", fontSize: "16px" }}
          >
            <option value="">Seleccione un usuario</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>
                {/* Ahora esto se actualizará solo al recargar */}
                {u.nombre} — Saldo: ${Number(u.saldo).toFixed(2)}
              </option>
            ))}
          </select>
      )}

      <br /><br />

      <input
        type="number"
        placeholder="Monto a recargar"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        style={{ padding: "10px", width: "150px", marginRight: "10px" }}
      />

      <button onClick={recargar} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Recargar saldo
      </button>
    </div>
  );
}

export default AdminPanel;