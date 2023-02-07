using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SilentApp.API.Contracts;
using SilentApp.API.Extensions;
using SilentApp.API.Models.App.Request;
using SilentApp.API.Models.App.Response;
using static SilentApp.API.Data.Procedures;
using static SilentApp.API.Models.App.Response.GetGroupsResponse;


namespace SilentApp.API.Controllers
{
    public class LinkController : BaseController
    {
        private readonly IProcedures _procedures;

        public LinkController(IProcedures procedures)
        {
            _procedures = procedures;
        }

        [HttpGet]
        public IActionResult GetGroups()
        {
            GetGroupsResponse result = _procedures.GetCollection<GetGroupsResponse, GroupsData>("A_GROUP_LIST_GET", new
            {
                USER_ID = User.GetUser()
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]), out List<GroupsData> groupsData);
            result.GroupsDatas = groupsData;

            if (result.StatusCode == 404)
            {
                return NotFound(result);
            }
            else if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddLink([FromBody]AddLinkRequest addLinkRequest)
        {
            DatabaseResult result = _procedures.Execute<DatabaseResult>("A_LINK_ADD", new
            {
                USER_ID = User.GetUser(),
                LINK = addLinkRequest.Link,
                GROUP_ID = addLinkRequest.GroupId
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]));
            if (result.StatusCode == 400)
            {
                return BadRequest(result);
            }
            if (result.StatusCode == 404)
            {
                return NotFound(result);
            }
            else if (result.StatusCode == 500)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return StatusCode(StatusCodes.Status201Created, result);
        }
    }
}