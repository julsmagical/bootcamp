--1. Todos los clientes
SELECT COUNT(CustomerID) AS Total_Clientes FROM SalesLT.Customer --1era forma
SELECT COUNT(*) AS Total_Clientes FROM SalesLT.Customer --2da forma

--2. Todas las ventas de un mes (junio)
DECLARE @FechaInicio DATETIME2= '2008-06-01'
DECLARE @FechaFin DATETIME2= '2008-06-30'

SELECT SalesOrderID AS ID_Venta, OrderDate AS Fecha, CustomerID AS ID_Cliente 
FROM SalesLT.SalesOrderHeader
WHERE OrderDate BETWEEN @FechaInicio AND @FechaFin

-- 2.2 comprobar: contar todas las ventas
SELECT OrderDate AS Fecha, COUNT(SalesOrderID) AS Total_VentasJunio
FROM SalesLT.SalesOrderHeader
GROUP BY OrderDate
HAVING OrderDate BETWEEN @FechaInicio AND @FechaFin

-- 3. Ordenar las categorías por nombre
SELECT DISTINCT Name AS Nombre_Categoria FROM SalesLT.ProductCategory
ORDER BY Name
-- ORDER BY Name DESC (orden descendente)

--4. Relacionar cabecera y detalle de una factura
SELECT soh.SalesOrderID AS ID_Venta, soh.OrderDate AS Fecha, sod.ProductID AS ID_Producto, sod.UnitPrice AS Precio
FROM SalesLT.SalesOrderHeader soh
INNER JOIN SalesLT.SalesOrderDetail sod
	ON soh.SalesOrderID = sod.SalesOrderID

--pruebas
SELECT * FROM SalesLT.SalesOrderDetail
SELECT * FROM SalesLT.SalesOrderHeader
SELECT Name FROM SalesLT.ProductModel

--5. Implementación de paginación (por ciudad)
DECLARE @PageNumber INT = 1;
DECLARE @RowsPerPage INT = 10;

SELECT City AS Ciudades FROM SalesLT.Address
  ORDER BY City
  OFFSET (@PageNumber - 1) * @RowsPerPage ROWS
  FETCH NEXT @RowsPerPage ROWS ONLY;

--6. Uso de DISTINCT y TOP
SELECT DISTINCT City AS Ciudad FROM SalesLT.Address

SELECT TOP 10 SalesOrderID AS ID_Venta, ProductID AS ID_Producto, UnitPrice AS Precio, ModifiedDate AS Fecha
FROM SalesLT.SalesOrderDetail
ORDER BY ModifiedDate DESC;

--top para ver precios mas elevados
SELECT DISTINCT TOP 10 UnitPrice AS Precios_Mas_Caros
FROM SalesLT.SalesOrderDetail
ORDER BY UnitPrice DESC


