
import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const NewTurn = () => {
    const [hora, setHora] = useState('');
    const [fecha, setFecha] = useState('');
    const [medicoId, setMedicoId] = useState('');
    const [especialidadId, setEspecialidadId] = useState('');


    const listaMedicos = [
        {
        nombre:"Juan Martinez",
        },
        {
            nombre:"Parra Alberto"
        }];
    const listaEspecialidades = ["Neurologia", "Pediatria"];


    const handleSubmit = (event) => {
        event.preventDefault();
    
        console.log("Datos del turno:", { hora, fecha, medicoId, especialidadId });
    };

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '300px',
                margin: 'auto',
                marginTop: '100px', // Ajusta la separación desde la parte superior
                gap: '16px',
            }}
            onSubmit={handleSubmit}
            >
            <TextField
                label="Hora"
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
            />
        
            <TextField
                label="Fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
            />
        
            <FormControl>
                <InputLabel id="medico-label" style={{ marginLeft: '8px' }}>
                Médico 
                </InputLabel>
                <Select
                labelId="medico-label"
                id="medico"
                value={''}
                onChange={(e) => setMedicoId(e.target.value)}
                required
                >
                {listaMedicos.map((medico) => (
                    <MenuItem key={medico.id} value={medico.id}>
                    {medico.nombre}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        
            <FormControl>
                <InputLabel id="especialidad-label" style={{ marginLeft: '8px' }}>
                Especialidad 
                </InputLabel>
                <Select
                labelId="especialidad-label"
                id="especialidad"
                value={especialidadId}
                onChange={(e) => setEspecialidadId(e.target.value)}
                required
                >
                {listaEspecialidades.map((especialidad) => (
                    <MenuItem key={especialidad.id} value={especialidad.id}>
                    {especialidad.nombre}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        
            <Button type="submit" variant="contained" color="primary">
                Registrar Turno
            </Button>
            </form>
        );  
    };
export default NewTurn;
