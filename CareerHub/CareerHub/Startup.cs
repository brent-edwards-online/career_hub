namespace CareerHub
{
    using Entities;
    using IdentityServer;
    using Service;
    using ViewModels;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;

    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Identity Server DbContext
            services.AddDbContext<ApplicationIdentityDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AWSConnection")));

            // Entity Framework DbContext
            services.AddDbContext<CareerHubDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AWSConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationIdentityDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc();

            services.AddTransient<IImageService, ImageService>();

            services.AddIdentityServer()
                .AddTemporarySigningCredential()
                .AddInMemoryPersistedGrants()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<ApplicationUser>()
                .AddProfileService<CustomProfileService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = "http://localhost:5000/",
                AllowedScopes = { "api" },
                RequireHttpsMetadata = false
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=CareerHub}/{action=Index}/{id?}");
            });

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseIdentityServer();
        }
    }
}
