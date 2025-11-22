const API_BASE_URL = 'https://brasilapi.com.br/api/feriados/v1';

export interface Feriado {
  date: string;
  name: string;
  type: string;
}

export interface FeriadoMarcado {
  marked: boolean;
  selected: boolean;
  selectedColor: string;
  holiday: boolean;
  holidayName: string;
}

export const feriadosService = {
  async buscarFeriados(ano: number): Promise<Feriado[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/${ano}`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar feriados');
      }
      
      const feriados: Feriado[] = await response.json();
      return feriados;
    } catch (error) {
      console.error('Erro ao buscar feriados:', error);
      throw error;
    }
  },

  verificarFeriado(data: Date | null | undefined, feriados: Feriado[]): Feriado | null {
    if (!data) return null;
    
    const dataStr = data.toISOString().split('T')[0];
    return feriados.find(f => f.date === dataStr) || null;
  },

  formatarParaCalendario(feriados: Feriado[]): Record<string, FeriadoMarcado> {
    const feriadosMarcados: Record<string, FeriadoMarcado> = {};
    
    feriados.forEach(feriado => {
      feriadosMarcados[feriado.date] = {
        marked: true,
        selected: true,
        selectedColor: '#ff5252',
        holiday: true,
        holidayName: feriado.name
      };
    });
    
    return feriadosMarcados;
  }
};