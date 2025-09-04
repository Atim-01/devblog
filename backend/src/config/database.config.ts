import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT', 5432),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  
  // Entity configuration
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  
  // Synchronization (only in development)
  synchronize: configService.get<string>('NODE_ENV') === 'development',
  
  // Logging (only in development)
  logging: configService.get<string>('NODE_ENV') === 'development',
  
  // SSL configuration for Aiven PostgreSQL with proper CA certificate
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIUPDuLYwKWP5PH4O26hmwSjRBydsgwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1ZGNjNjI5MzQtZjRlZi00ZjQ2LTgxYWQtMjI2M2IzZjVi
NDA4IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwOTAyMDIxNTM2WhcNMzUwODMxMDIx
NTM2WjBAMT4wPAYDVQQDDDVkY2M2MjkzNC1mNGVmLTRmNDYtODFhZC0yMjYzYjNm
NWI0MDggR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAKqTBJWWZUtCVZnYBqBFk8tKMbf73NEIaHy/WKw0dB4bf/8UAS1DSkaF
PjCmanuroqj6Ij7wP+PUWDan25OSUHzCcmaKaV5cgKmOzyicrxrC/q80BV+X5szH
Jqq+7gmaGmk2RFeabmvAAJklhn/x0b2wcQy8haZJQpn5kX3bMF4Lq1Hma+PBAi39
GVjoTxuEV5R+IOShtfyfD+mHArwej3IKCX5yxOgNmA8Te7FLgHAgeCeyWZjCsY4n
Y/Ok6uT/Ymy4wS/CIZp4KOnlApXHK74dFzuZFDRCvmYxt33A/VUPlBc2rPCLMGhF
GnHPsPC+ekPDE9sps+aMixx7Dp+2tW/c09k2qypWThAoUS+JNm9NiB8ICJpNxwMC
SENHAiwR3HrDM8A/CMzK6WJSL3aVvGpY6eb+N2zqMJZqXhmsAWVttHY3rU+e5rP7
2vvK5TlbyP4rPNvpv/MT4viRnS2pCRXhWnJlrP7mjQh8e0X451xsHtwvKP8efq33
PUidLT3txQIDAQABo0IwQDAdBgNVHQ4EFgQUMLahQvkFRKY2T7skx0BOQU9sfhIw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBAEBz3njnL8RbHsntHCbwVHj7226k14kcuKAWrTpGX0uf3ZQQLTg0xKeltDID
eVe4v1xE3Xti8gTsiL4foi5FKunuK6Q90xRTfFu927ULasFaKXBL9Zrd0mwVdXJF
Wkc2UOtwj8utJKA0/NjmQr0WNijncO6EZS7BBXpVuB29vj863ZB/TMg+Ol2SlkuN
RsQ8YPQmYHgLm+UgKEYw75FYQHzRrUG+GuSvuWKwr/UBSuobw4XIaLZPuUjsyj+u
SiLODwK+OkC16ZQ57ZD9sGF9aN9qOWlDM6SxuDgdARm7LsgHd9L2yB/NpflAJ0L/
wezfD6PumxDsYr6sAVqTruZBnhHZJ8Bqu/0++nK0mImT05a9Ca+T/zLugqmj/C38
GbtLJSzOZJ8wPGtshRoA3mh2L+hn0PtVx8OneKUeLevoTrcJfcdVmynQJVRw30P5
oniJpNz2mB47WJbaFopreagqwhAvxm2EDvdmtjV0vnq/ZE4tosuOD0yZg3L/bltG
MIUDBg==
-----END CERTIFICATE-----`,
  },
  
  // Connection pool settings
  extra: {
    max: 20, // Maximum number of connections in the pool
    connectionTimeoutMillis: 30000, // Connection timeout
    idleTimeoutMillis: 30000, // Idle connection timeout
    ssl: {
      rejectUnauthorized: true,
      ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIUPDuLYwKWP5PH4O26hmwSjRBydsgwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1ZGNjNjI5MzQtZjRlZi00ZjQ2LTgxYWQtMjI2M2IzZjVi
NDA4IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwOTAyMDIxNTM2WhcNMzUwODMxMDIx
NTM2WjBAMT4wPAYDVQQDDDVkY2M2MjkzNC1mNGVmLTRmNDYtODFhZC0yMjYzYjNm
NWI0MDggR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAKqTBJWWZUtCVZnYBqBFk8tKMbf73NEIaHy/WKw0dB4bf/8UAS1DSkaF
PjCmanuroqj6Ij7wP+PUWDan25OSUHzCcmaKaV5cgKmOzyicrxrC/q80BV+X5szH
Jqq+7gmaGmk2RFeabmvAAJklhn/x0b2wcQy8haZJQpn5kX3bMF4Lq1Hma+PBAi39
GVjoTxuEV5R+IOShtfyfD+mHArwej3IKCX5yxOgNmA8Te7FLgHAgeCeyWZjCsY4n
Y/Ok6uT/Ymy4wS/CIZp4KOnlApXHK74dFzuZFDRCvmYxt33A/VUPlBc2rPCLMGhF
GnHPsPC+ekPDE9sps+aMixx7Dp+2tW/c09k2qypWThAoUS+JNm9NiB8ICJpNxwMC
SENHAiwR3HrDM8A/CMzK6WJSL3aVvGpY6eb+N2zqMJZqXhmsAWVttHY3rU+e5rP7
2vvK5TlbyP4rPNvpv/MT4viRnS2pCRXhWnJlrP7mjQh8e0X451xsHtwvKP8efq33
PUidLT3txQIDAQABo0IwQDAdBgNVHQ4EFgQUMLahQvkFRKY2T7skx0BOQU9sfhIw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBAEBz3njnL8RbHsntHCbwVHj7226k14kcuKAWrTpGX0uf3ZQQLTg0xKeltDID
eVe4v1xE3Xti8gTsiL4foi5FKunuK6Q90xRTfFu927ULasFaKXBL9Zrd0mwVdXJF
Wkc2UOtwj8utJKA0/NjmQr0WNijncO6EZS7BBXpVuB29vj863ZB/TMg+Ol2SlkuN
RsQ8YPQmYHgLm+UgKEYw75FYQHzRrUG+GuSvuWKwr/UBSuobw4XIaLZPuUjsyj+u
SiLODwK+OkC16ZQ57ZD9sGF9aN9qOWlDM6SxuDgdARm7LsgHd9L2yB/NpflAJ0L/
wezfD6PumxDsYr6sAVqTruZBnhHZJ8Bqu/0++nK0mImT05a9Ca+T/zLugqmj/C38
GbtLJSzOZJ8wPGtshRoA3mh2L+hn0PtVx8OneKUeLevoTrcJfcdVmynQJVRw30P5
oniJpNz2mB47WJbaFopreagqwhAvxm2EDvdmtjV0vnq/ZE4tosuOD0yZg3L/bltG
MIUDBg==
-----END CERTIFICATE-----`,
    },
  },
  
  // Auto-load entities
  autoLoadEntities: true,
  
  // Keep connection alive
  keepConnectionAlive: true,
  
  // Retry connection on failure
  retryAttempts: 3,
  retryDelay: 3000,
});
