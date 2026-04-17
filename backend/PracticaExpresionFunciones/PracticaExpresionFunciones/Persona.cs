namespace PracticaExpresionFunciones
{
    public class Persona
    {
        public string Nombre { get; set; }
        public int Edad { get; set; }

        public Persona(string nombre, int edad)
        {
            Nombre = nombre;
            Edad = edad;
        }

        public override string ToString()
        {
            return $"Nombre: {Nombre}, Edad: {Edad}";
        }

    }
}
