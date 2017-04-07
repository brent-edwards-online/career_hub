using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;
using System.Security.Claims;

namespace CareerHub.IdentityServer
{
    public class Config
    {
        // scopes define the resources in your system
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Address()
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api", "CareerHub Api")
            };
        }

        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> GetClients()
        {
            // client credentials client
            return new List<Client>
            {
                new Client
                {
                    ClientId = "careerHubApi",
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,

                    AllowedScopes = {
                        "offline_access",
                        IdentityServerConstants.StandardScopes.OpenId, // For UserInfo endpoint.
                        IdentityServerConstants.StandardScopes.Profile,
                        "roles",
                        "api"
                    }

                }
            };
        }
    }
}
