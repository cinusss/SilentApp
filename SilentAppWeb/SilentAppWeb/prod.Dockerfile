FROM        mcr.microsoft.com/dotnet/core/aspnet AS base
WORKDIR     /app

FROM        mcr.microsoft.com/dotnet/core/sdk AS build
WORKDIR     /src
COPY        ["SilentAppWeb.csproj", "./"]
RUN         dotnet restore "./SilentAppWeb.csproj"

RUN         apt-get update
RUN         apt-get install tzdata


COPY        . .
WORKDIR     "/src/."
RUN         dotnet build "SilentAppWeb.csproj" -c Release -o /app

FROM        build AS publish
RUN         dotnet publish "SilentAppWeb.csproj" -c Release -o /app

FROM        base AS final
ENV         ASPNETCORE_URLS=http://*:8080
EXPOSE      8080
WORKDIR     /app
COPY        --from=publish /app .
ENTRYPOINT [ "dotnet", "SilentAppWeb.dll" ]
