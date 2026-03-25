using CalculadoraBasica.Startup.Interfaces;
using CalculadoraBasica.Startup.Models;

namespace CalculadoraBasica.Startup.Classes
{
    public class Application(string name, string version) : InterfaceApplication
    {
        private List<Command> _commands = [];

        private void InitCommands()
        {
            _commands.Add(new Command()
            {
                Id = 1,
                Description = "Sumar dos números",
                Usage = "num1 + num2",
                Return = "Resultado: total sumado\n"
            });

            _commands.Add(new Command()
            {
                Id = 2,
                Description = "Restar dos números",
                Usage = "num1 - num2",
                Return = "Resultado: total restado\n"
            });

            _commands.Add(new Command()
            {
                Id = 3,
                Description = "Multiplicar dos números",
                Usage = "num1 * num2",
                Return = "Resultado: total multiplicado\n"
            });

            _commands.Add(new Command()
            {
                Id = 4,
                Description = "Dividir dos números",
                Usage = "num1 / num2",
                Return = "Resultado: total dividido\n"
            });
        }

        public void ShowHelp()
        {
            var message = $"""
                ---------------------------------

                {name} {version}

                ---------------------------------

                Comandos:\n
                {string.Join("\n", _commands.Select((cmd) => $"{cmd.Id}. {cmd.Description}\n Uso:{cmd.Usage}\n retorna:{cmd.Return}"))}

                ---------------------------------
                """;
            Console.WriteLine(message);
        }

        public void ShowMessage(string message, ConsoleColor color = ConsoleColor.Yellow)
        {
            Console.ForegroundColor = color;
            Console.WriteLine(message);
            Console.ResetColor();
        }

        public string ShowQuestion(string question, ConsoleColor color = ConsoleColor.DarkBlue)
        {
            Console.ForegroundColor = color;
            Console.Write(question);
            Console.ResetColor();

            return Console.ReadLine() ?? string.Empty;
        }

        //logica de la calculadora
        public double Sumar(double a, double b) => a + b;
        public double Restar(double a, double b) => a - b;
        public double Multiplicar(double a, double b) => a * b;
        public double Dividir(double a, double b)
        {
            if (b == 0)
                //validacion 1 - corregida despues de compilar
                throw new DivideByZeroException("no se puede dividir entre cero");
            return a/b;
        }

        private (double, double) PedirNumeros()
        {
            var input1 = ShowQuestion("Primer numero: ", ConsoleColor.DarkBlue);
            var input2 = ShowQuestion("Segundo numero: ", ConsoleColor.DarkBlue);

            if (string.IsNullOrWhiteSpace(input1) || string.IsNullOrWhiteSpace(input2))
                throw new ArgumentNullException(null, "Los numeros no pueden estar vacios");
            if (!double.TryParse(input1, out double a) || !double.TryParse(input2, out double b))
                throw new FormatException("Los valores ingresados no son numeros válidos");
            return (a, b);
        }

        public void Start()
        {
            InitCommands();

            while (true)
            {
                //Console.Clear(); //Luego no se muestran bien las excepciones :(
                ShowHelp();
                try
                {
                    var opcionStr = ShowQuestion("Seleccione una opción: ", ConsoleColor.Cyan);

                    if (!int.TryParse(opcionStr, out int comandoId))
                        throw new FormatException("Ingrese un numero de opción válido.");

                    var findCommand = _commands.FirstOrDefault(cmd => cmd.Id == comandoId);

                    if (findCommand is null)
                        throw new Exception($"Comando '{comandoId}' no encontrado. Elija una opción en el menú");

                    var (a, b) = PedirNumeros();

                    double resultado = findCommand.Id switch
                    {
                        1 => Sumar(a, b),
                        2 => Restar(a, b),
                        3 => Multiplicar(a, b),
                        4 => Dividir(a, b),
                        _ => throw new Exception("Operación no implementada")
                    };
                    ShowMessage($"\nResult: {resultado}\n", ConsoleColor.Cyan);
                    Console.WriteLine("Presione una tecla para continuar...");
                    Console.ReadKey();
                }
                catch (ArgumentNullException ex)
                {
                    ShowMessage($"\nError: {ex.Message}\n", ConsoleColor.Red);
                }
                catch (FormatException ex)
                {
                    ShowMessage($"\nError: {ex.Message}\n", ConsoleColor.Red);
                }
                catch (DivideByZeroException ex)
                {
                    ShowMessage($"\nError: {ex.Message}\n", ConsoleColor.Red);
                }
                catch (Exception ex)
                {
                    ShowMessage($"\nError: {ex.Message}\n", ConsoleColor.Red);
                }
            }
        }
    }
}