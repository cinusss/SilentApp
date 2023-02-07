FROM        mcr.microsoft.com/dotnet/core/aspnet AS base
WORKDIR     /app

FROM        mcr.microsoft.com/dotnet/core/sdk AS build
WORKDIR     /src
COPY        ["SilentApp.API.csproj", "./"]
RUN         dotnet restore "./SilentApp.API.csproj"

RUN         apt-get update
RUN         apt-get install tzdata


COPY        . .
WORKDIR     "/src/."
RUN         dotnet build "SilentApp.API.csproj" -c Release -o /app

FROM        build AS publish
RUN         dotnet publish "SilentApp.API.csproj" -c Release -o /app

FROM        base AS final
ENV         ASPNETCORE_URLS=http://*:5000
EXPOSE      5000
WORKDIR     /app
COPY        --from=publish /app .
ENTRYPOINT [ "dotnet", "SilentApp.API.dll" ]
