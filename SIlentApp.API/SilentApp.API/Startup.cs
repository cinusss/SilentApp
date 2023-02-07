using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SilentApp.API.Contracts;
using SilentApp.API.Data;
using SilentApp.API.Extensions;
using SilentApp.API.Helpers;
using SilentApp.API.Services;
using SilentApp.API.Validators;
using System.Collections.Generic;

namespace SilentApp.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(opt =>
            {
                opt.Filters.Add(typeof(ValidatorActionFilter));
            }).AddFluentValidation(fvc => fvc.RegisterValidatorsFromAssemblyContaining<Startup>());

            var jwtSettings = Configuration.GetSection("Jwt").Get<JwtSettings>();
            services.AddAuth(jwtSettings);

            //services.AddSwaggerGen(options =>
            //{
            //    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            //    {
            //        Description = "Co się interesujesz",
            //        Name = "Authorization",
            //        In = ParameterLocation.Header,
            //        Type = SecuritySchemeType.Http,
            //        Scheme = "bearer",
            //    });

            //    var security = new OpenApiSecurityRequirement
            //    {
            //        {
            //            new OpenApiSecurityScheme
            //            {
            //                Reference = new OpenApiReference
            //                {
            //                    Id = "Bearer",
            //                    Type = ReferenceType.SecurityScheme
            //                },
            //                UnresolvedReference = true
            //            },
            //            new List<string>()
            //        }
            //    };

            //    options.AddSecurityRequirement(security);

            //    options.SwaggerDoc("v2", new Microsoft.OpenApi.Models.OpenApiInfo
            //    {
            //        Title = "SilentApp API",
            //        Version = "v2",
            //        Description = "Nie interesuj się",
            //    });
            //    options.OperationFilter<AddRequiredHeaderParameter>();
            //});

            services.AddSingleton<IConfiguration>(Configuration);
            services.Configure<JwtSettings>(Configuration.GetSection("Jwt"));
            services.AddScoped<IProcedures, Procedures>();
            services.AddScoped<IEmailService, EmailService>();

        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseExceptionHandler(appBuilder =>
                //{
                //    appBuilder.Run(async context =>
                //    {
                //        context.Response.StatusCode = 500;
                //        await context.Response.WriteAsync("Ups... Coś poszło nie tak. Spróbuj później.");
                //    });
                //});
            }
            else
            {
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("Ups... Coś poszło nie tak. Spróbuj później.");
                    });
                });
            }
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseRouting();

            app.UseAuth();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //app.UseSwagger();
            //app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v2/swagger.json", "SilentApp"));
        }
    }
}
