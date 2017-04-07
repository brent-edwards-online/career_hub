using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareerHub.Service
{
    public class ImageService : IImageService
    {
        public string GetMessage()
        {
            return "Helloe from service";
        }
    }
}
