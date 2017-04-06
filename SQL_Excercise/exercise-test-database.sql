CREATE DATABASE [exercise-test]

CONTAINMENT = NONE

--ON  PRIMARY 
--( NAME = N'exercise-test', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\exercise-test.mdf' , SIZE = 3072KB , FILEGROWTH = 1024KB )
-- LOG ON 
--( NAME = N'exercise-test_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL10_50.SQLEXPRESS\MSSQL\DATA\exercise-test_log.ldf' , SIZE = 4096KB , FILEGROWTH = 10%)
GO


ALTER DATABASE [exercise-test] SET COMPATIBILITY_LEVEL = 120
GO
ALTER DATABASE [exercise-test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [exercise-test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [exercise-test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [exercise-test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [exercise-test] SET ARITHABORT OFF 
GO
ALTER DATABASE [exercise-test] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [exercise-test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [exercise-test] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [exercise-test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [exercise-test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [exercise-test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [exercise-test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [exercise-test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [exercise-test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [exercise-test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [exercise-test] SET  DISABLE_BROKER 
GO
ALTER DATABASE [exercise-test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [exercise-test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [exercise-test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [exercise-test] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [exercise-test] SET  READ_WRITE 
GO
ALTER DATABASE [exercise-test] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [exercise-test] SET  MULTI_USER 
GO
ALTER DATABASE [exercise-test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [exercise-test] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [exercise-test] SET DELAYED_DURABILITY = DISABLED 
GO
USE [exercise-test]
GO
IF NOT EXISTS (SELECT name FROM sys.filegroups WHERE is_default=1 AND name = N'PRIMARY') ALTER DATABASE [exercise-test] MODIFY FILEGROUP [PRIMARY] DEFAULT
GO

USE [exercise-test]

GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](500) NULL,
	[PasswordReminder] [nvarchar](100) NULL,
	[PasswordEncryptType] [tinyint] NOT NULL CONSTRAINT [DF_Users_PasswordEncryptionType]  DEFAULT ((0)),
	[IsActive] [bit] NOT NULL,
	[Created] [datetime] NOT NULL,
	[LastLogin] [datetime] NULL,
	[OpenID] [bit] NULL,
	[UpdateCache] [bit] NOT NULL CONSTRAINT [DF_UpdateCache]  DEFAULT ((0)),
	[RequirePasswordReset] [bit] NOT NULL CONSTRAINT [DF_Users_RequirePasswordReset]  DEFAULT ((0)),
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_User] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[Users_AccessLog](
	[UserId] [int] NOT NULL,
	[LoginDate] [datetime] NOT NULL,
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[IPAddress] [nvarchar](50) NULL,
 CONSTRAINT [PK_Users_AcessLog] PRIMARY KEY NONCLUSTERED 
(
	[ID] ASC
)
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[JobSeekers](
	[EntityId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[FirstName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NULL,
	[ContactDetailsId] [int] NOT NULL,
	[ExternalId] [nvarchar](100) NULL,
	[IsProvisioned] [bit] NOT NULL CONSTRAINT [DF_JobSeekers_IsProvisioned] DEFAULT ((0)),
	[CardID] [nvarchar](100) NULL,
	[IsDeceased] [bit] NOT NULL CONSTRAINT [DF_JobSeekers_Deceased] DEFAULT ((0)),
	[CalcExternalID] AS (coalesce(nullif([ExternalID],''),'EntityID_'+CONVERT([varchar],[EntityID],(0)))),
	[AcceptedTermsDate] [datetime] NULL,
	[DisplayName] AS ((coalesce(nullif([FirstName],'')+' ','')+coalesce(nullif([LastName],'')+' ',''))+coalesce(('('+nullif([ExternalId],''))+')','')),
	[PrimaryEmailID] [int] NOT NULL,
	[BackupEmailID] [int] NOT NULL,
 CONSTRAINT [PK_JobSeeker] PRIMARY KEY CLUSTERED 
(
	[EntityId] ASC
),
 CONSTRAINT [IX_JobSeeker] UNIQUE NONCLUSTERED 
(
	[UserId] ASC
)
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[Users_Labels](
	[EntityId] [int] NOT NULL,
	[LabelId] [int] NOT NULL,
 CONSTRAINT [PK_Users_Labels] PRIMARY KEY NONCLUSTERED 
(
	[EntityId] ASC,
	[LabelId] ASC
)
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Users_AccessLog] WITH CHECK ADD CONSTRAINT [FK_UserAccessLog_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[JobSeekers] ([UserID])
GO

ALTER TABLE [dbo].[Users_AccessLog] CHECK CONSTRAINT [FK_UserAccessLog_Users]
GO

ALTER TABLE [dbo].[JobSeekers] WITH CHECK ADD CONSTRAINT [FK_JobSeekers_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([ID])
GO

ALTER TABLE [dbo].[Users_Labels] WITH CHECK ADD CONSTRAINT [FK_Users_Labels_Entities] FOREIGN KEY([EntityId])
REFERENCES [dbo].[JobSeekers] ([UserID])
GO

ALTER TABLE [dbo].[Users_Labels] CHECK CONSTRAINT [FK_Users_Labels_Entities]
GO



SET IDENTITY_INSERT [dbo].[Users] ON
GO

INSERT [dbo].[Users] ([Id], [UserName], [Password], [PasswordReminder], [PasswordEncryptType], [IsActive], [Created], [LastLogin], [OpenID], [UpdateCache], [RequirePasswordReset]) VALUES (18880, N'233853', NULL, NULL, 0, 1, CAST(N'2012-02-07 07:19:11.790' AS DateTime), NULL, NULL, 1, 0)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Password], [PasswordReminder], [PasswordEncryptType], [IsActive], [Created], [LastLogin], [OpenID], [UpdateCache], [RequirePasswordReset]) VALUES (18881, N's770812', NULL, NULL, 0, 1, CAST(N'2012-02-07 07:19:11.807' AS DateTime), NULL, NULL, 1, 0)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Password], [PasswordReminder], [PasswordEncryptType], [IsActive], [Created], [LastLogin], [OpenID], [UpdateCache], [RequirePasswordReset]) VALUES (18882, N's373562', NULL, NULL, 0, 1, CAST(N'2012-02-07 07:19:11.830' AS DateTime), NULL, NULL, 1, 0)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Password], [PasswordReminder], [PasswordEncryptType], [IsActive], [Created], [LastLogin], [OpenID], [UpdateCache], [RequirePasswordReset]) VALUES (18883, N's186433', NULL, NULL, 0, 1, CAST(N'2012-02-07 07:19:11.980' AS DateTime), NULL, NULL, 1, 0)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Password], [PasswordReminder], [PasswordEncryptType], [IsActive], [Created], [LastLogin], [OpenID], [UpdateCache], [RequirePasswordReset]) VALUES (18884, N's158882', NULL, NULL, 0, 1, CAST(N'2012-02-07 07:19:11.997' AS DateTime), NULL, NULL, 1, 0)
GO
INSERT [dbo].[Users] ([Id], [UserName], [Password], [PasswordReminder], [PasswordEncryptType], [IsActive], [Created], [LastLogin], [OpenID], [UpdateCache], [RequirePasswordReset]) VALUES (18885, N's368463', NULL, NULL, 0, 1, CAST(N'2012-02-07 07:19:12.020' AS DateTime), NULL, NULL, 1, 0)
GO


INSERT [dbo].[JobSeekers] ([EntityId], [UserId], [FirstName], [LastName], [ContactDetailsId], [ExternalId], [IsProvisioned], [CardID], [IsDeceased], [AcceptedTermsDate], [PrimaryEmailID], [BackupEmailID]) VALUES (41883, 18880, N'Nick', N'Farthing', 25139, N'34324', 1, NULL, 0, '20150105', 19277, 32001)
GO
INSERT [dbo].[JobSeekers] ([EntityId], [UserId], [FirstName], [LastName], [ContactDetailsId], [ExternalId], [IsProvisioned], [CardID], [IsDeceased], [AcceptedTermsDate], [PrimaryEmailID], [BackupEmailID]) VALUES (41884, 18881, N'Simone', N'Barra', 25140, N'84758135848', 1, NULL, 0, '20150307', 23285, 32002)
GO
INSERT [dbo].[JobSeekers] ([EntityId], [UserId], [FirstName], [LastName], [ContactDetailsId], [ExternalId], [IsProvisioned], [CardID], [IsDeceased], [AcceptedTermsDate], [PrimaryEmailID], [BackupEmailID]) VALUES (41885, 18882, N'Leo', N'Gregory', 25141, N'7558468485455', 0, NULL, 0, NULL, 16055, 32003)
GO
INSERT [dbo].[JobSeekers] ([EntityId], [UserId], [FirstName], [LastName], [ContactDetailsId], [ExternalId], [IsProvisioned], [CardID], [IsDeceased], [AcceptedTermsDate], [PrimaryEmailID], [BackupEmailID]) VALUES (41889, 18883, N'Alison', N'Ayliffe', 25142, N'84758135848', 0, NULL, 0, '20090507', 1152, 32004)
GO
INSERT [dbo].[JobSeekers] ([EntityId], [UserId], [FirstName], [LastName], [ContactDetailsId], [ExternalId], [IsProvisioned], [CardID], [IsDeceased], [AcceptedTermsDate], [PrimaryEmailID], [BackupEmailID]) VALUES (41890, 18884, N'Febi', N'Larson', 25143, N'343246465157', 0, NULL, 0, '20100507', 8185, 32005)
GO
INSERT [dbo].[JobSeekers] ([EntityId], [UserId], [FirstName], [LastName], [ContactDetailsId], [ExternalId], [IsProvisioned], [CardID], [IsDeceased], [AcceptedTermsDate], [PrimaryEmailID], [BackupEmailID]) VALUES (41891, 18885, N'Kristy', N'Hervey', 25144, N'6264841575', 1, NULL, 0, '20140607', 15079, 32006)



insert into [dbo].[Users_AccessLog](Userid, LoginDate, IpAddress) VALUES (18880, '20150715', '192.168.0.1')
insert into [dbo].[Users_AccessLog](Userid, LoginDate, IpAddress) VALUES (18881, getdate(), '192.168.0.1')
insert into [dbo].[Users_AccessLog](Userid, LoginDate, IpAddress) VALUES (18882, '20150702', '192.168.0.1')
insert into [dbo].[Users_AccessLog](Userid, LoginDate, IpAddress) VALUES (18883, '20150602', '192.168.0.1')
insert into [dbo].[Users_AccessLog](Userid, LoginDate, IpAddress) VALUES (18883, '20150705', '192.168.0.1')
insert into [dbo].[Users_AccessLog](Userid, LoginDate, IpAddress) VALUES (18883, '20150717', '192.168.0.1')


insert into [dbo].[Users_Labels] VALUES (18880, 151)
insert into [dbo].[Users_Labels] VALUES (18883, 151)


