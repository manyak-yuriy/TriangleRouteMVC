using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TriangleRouteMVC.Startup))]
namespace TriangleRouteMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
