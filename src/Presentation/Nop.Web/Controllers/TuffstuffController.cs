using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Nop.Services.Security;
using Nop.Web.Factories;
using Nop.Web.Framework;
using Nop.Web.Framework.Controllers;

namespace Nop.Web.Controllers
{
    public partial class TuffstuffController : BasePublicController
    {
        #region Fields

        private readonly IPermissionService _permissionService;
        private readonly ITopicModelFactory _topicModelFactory;

        #endregion

        #region Ctor

        public TuffstuffController(IPermissionService permissionService,
            ITopicModelFactory topicModelFactory)
        {
            _permissionService = permissionService;
            _topicModelFactory = topicModelFactory;
        }

        #endregion

        #region Methods

        [Route("about-us")]
        public virtual IActionResult About()
        {
            return View();
        }

        [Route("shows")]
        public virtual async Task<IActionResult> Shows()
        {
            var model = await _topicModelFactory.PrepareTopicModelBySystemNameAsync("Shows");

            var hasAdminAccess = await _permissionService.AuthorizeAsync(StandardPermission.Security.ACCESS_ADMIN_PANEL)
                && await _permissionService.AuthorizeAsync(StandardPermission.ContentManagement.TOPICS_CREATE_EDIT_DELETE);

            //display "edit" (manage) link
            if (hasAdminAccess)
                DisplayEditLink(Url.Action("Edit", "Topic", new { id = model.Id, area = AreaNames.ADMIN }));

            return View(model);
        }

        #endregion
    }
}
