using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SilentApp.API.Contracts;
using SilentApp.API.Extensions;
using SilentApp.API.Models.App.Request;
using SilentApp.API.Models.App.Response;
using static SilentApp.API.Data.Procedures;
using static SilentApp.API.Models.App.Response.GetActionsInfoResponse;
using static SilentApp.API.Models.App.Response.LinkResponse;

namespace SilentApp.API.Controllers
{
    public class ActionController : BaseController
    {
        private readonly IProcedures _procedures;

        public ActionController(IProcedures procedures)
        {
            _procedures = procedures;
        }

        [HttpGet]
        public IActionResult GetActionsInfo()
        {
            GetActionsInfoResponse result = _procedures.GetCollection<GetActionsInfoResponse, ActionData>("A_ACTION_LIST_GET", new
            {
                USER_ID = User.GetUser()
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]) , out List<ActionData> actionsData);
            result.ActionDatas = actionsData;

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

        [HttpGet]
        public IActionResult GetLinks([FromQuery]int groupId)
        {
            LinkResponse result = _procedures.GetCollection<LinkResponse, LinkData>("A_LINK_LIST_GET", new
            {
                USER_ID = User.GetUser(),
                GROUP_ID = groupId
            }, Convert.ToInt32(this.Request.Headers["ApplicationType"]), out List<LinkData> linksData);
            result.LinkDatas = linksData;

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
        public IActionResult AddAction([FromBody]AddActionRequest addActionRequest)
        {
            DataTable ids = new DataTable();
            ids.Columns.Add("LinkId", typeof(int));
            DataRow dr = null;
            foreach(var id in addActionRequest.LinkIdList) 
            {
                dr = ids.NewRow();
                dr["LinkId"] = id;
                ids.Rows.Add(dr);
            }
            DatabaseResult result = _procedures.Execute<DatabaseResult>("A_ACTION_ADD", new {
                USER_ID = User.GetUser(),
                LINK_ID_LIST = ids,
                ACTION_DATE = addActionRequest.ActionDate,
                ACTIVE = addActionRequest.Active
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