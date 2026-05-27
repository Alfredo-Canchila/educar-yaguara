export interface Lead {
  id: string;
  created_at: string;
  nombre: string;
  correo: string;
  telefono: string;
  programa_interes: string;
  mensaje?: string;
  estado: 'Nuevo' | 'En Proceso' | 'Contactado';
}
