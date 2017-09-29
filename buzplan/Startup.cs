using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(buzplan.Startup))]
namespace buzplan
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
