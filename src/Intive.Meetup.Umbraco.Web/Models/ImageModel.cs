using System;
using System.Collections.Generic;

namespace Intive.Meetup.Umbraco.Web.Models
{
    public class ImageModel
    {
        public Uri Url { get; set; }
        public string Alt { get; set; }
        public string Caption { get; set; }
        public IEnumerable<SrcSetItemModel> SrcSet { get; set; }
    }
}