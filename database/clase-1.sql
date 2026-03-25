IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'TalentInsights')
    CREATE DATABASE TalentInsights;
GO

USE TalentInsights;
GO

USE prueba
GO

CREATE TABLE Collaborators (
    Id            UNIQUEIDENTIFIER   NOT NULL DEFAULT NEWID(),
    FullName      NVARCHAR(150)      NOT NULL,
    GitlabProfile NVARCHAR(255)      NULL,
    Position      NVARCHAR(100)      NOT NULL,
    JoinedAt      DATETIME2          NOT NULL DEFAULT SYSUTCDATETIME(),
    IsActive      BIT                NOT NULL DEFAULT 1,
    CreatedAt     DATETIME2          NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2          NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_Collaborators PRIMARY KEY (Id)
);
GO

INSERT INTO Collaborators(FullName, Position)
Values
('Neider', 'Desarrollador');

SELECT * FROM Collaborators

-- Get user by Id
SELECT FullName, GitlabProfile, Position, Id FROM Collaborators
where Id = '0CD59052-1CD1-4ACA-8BEA-6C2699707899'

-- Get user by FullName
SELECT FullName, GitlabProfile, Position, Id FROM Collaborators
where FullName = 'juliet'

-- ya creado ((1, 1) puede ser reemplazado por serial)
CREATE TABLE Roles (
RoleId INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
Name NVARCHAR(100) NOT NULL,
ShowName NVARCHAR(255) NOT NULL,
CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- para dropear/tirar una tabla
DROP TABLE Roles


INSERT INTO Roles (Name, ShowName)
VALUES
('MODERATOR', 'Moderador');

SELECT * FROM Roles
