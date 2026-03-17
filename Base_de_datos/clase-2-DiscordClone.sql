CREATE DATABASE DiscordClone;
GO

USE DiscordClone;
GO

CREATE TABLE Roles (
	RoleId INT IDENTITY(1, 1) NOT NULL,
	Code NVARCHAR(10) NOT NULL,
	ShowName NVARCHAR(100) NOT NULL,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLER UserStatus (
	UserStatusId INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
	Code NVARCHAR(10) NOT NULL,
	ShowName NVARCHAR(11) NOT NULL,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

INSERT INTO UserStatusType (Code, ShowName)
VALUES
('online',			'En linea'),
('notdisturbed',	'No molestar'),
('idle',			'Ausente'),
('ghost',			'Invisible'),




CREATE TABLE Users(
	UserId UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
	UserName NVARCHAR(32) NOT NULL,
	DisplayName NVARCHAR(100) NOT NULL,
	Description NVARCHAR(255) NULL,
	StatusType INT NOT NULL REFERENCES UserStatusType(UserStatusType) DEFAULT (1), --online
	StatusTime INT NULL,
	StatusContent NVARCHAR(50) NULL DEFAULT ('Hi, there!'),
	AvatarUrl NVARCHAR(50) NULL,
	BannerUrl NVARCHAR(50) NULL,
	--RoleId INT NOT NULL REFERENCES Roles(RoleId),
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
	--CONSTRAINT FK_Roles_RolesId FOREIGN KEY (RoleId) REFERENCES Roles (RoleId)
);
GO

CREATE TABLE Collections (
	CollectionId UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	Name NVARCHAR(50) NOT NULL,
	Description NVARCHAR(100) NOT NULL DEFAULT('This is my collection'),
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
	DeletedAt DATETIME2, --hacer eliminado logico
);
GO

CREATE TABLE Items(
	ItemId INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
	Name NVARCHAR(50) NOT NULL UNIQUE,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

INSERT INTO Items (Name)
VALUES
('Hollow Knight'), --Pago $10
('Osu!'); --Pago $10

CREATE TABLE CollectionsItems(
	CollectionId UNIQUEIDENTIFIER NOT NULL REFERENCES Collections(CollectionId),
	ItemId INT NOT NULL REFERENCES Items (ItemId) ON DELETE CASCADE,
	CONSTRAINT PK_CollectionsItems_CollectionId_ItemId PRIMARY KEY (CollectionId, ItemId),
);
GO

INSERT INTO Collections (Name, Description)
VALUES
('Mis juegos', 'Juegos');

select * from Collections
where DeletedAt IS NULL

select * from Items

DECLARE @CollectionId UNIQUEIDENTIFIER = '2D1CA671-C494-4AAD-923C-DC3A2DAC5417'
DECLARE @ItemHollowKnight INT = (SELECT ItemId FROM Items WHERE ItemId = 1);
DECLARE @ItemOsuId INT = (SELECT ItemId FROM Items WHERE ItemId = 2);


INSERT INTO CollectionsItems (CollectionId, ItemId)
VALUES
(@CollectionId, @ItemOsuId)
GO

SELECT * FROM Items
WHERE Name IN ('Hollow Knight', 'Osu!');

DECLARE @ItemABuscar NVARCHAR(50) = 'Hollow Knight'

select * from Items
WHERE Name = @ItemABuscar

CREATE INDEX IX_Items_Name ON Items (Name)





