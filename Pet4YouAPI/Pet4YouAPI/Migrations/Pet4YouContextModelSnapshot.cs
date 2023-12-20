using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Pet4YouAPI.DBContext;

#nullable disable

namespace Pet4YouAPI.Migrations
{
    [DbContext(typeof(Pet4YouContext))]
    partial class Pet4YouContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Pet4YouAPI.Models.Advertisement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Completed")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PetType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("PublicationDate")
                        .HasColumnType("datetime");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.Property<string>("Type")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Advertisements");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.AdvertisementDeleting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AdminUserId")
                        .HasColumnType("int");

                    b.Property<int?>("AdvertisementId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("datetime");

                    b.Property<string>("Reason")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.HasIndex("AdminUserId");

                    b.HasIndex("AdvertisementId");

                    b.ToTable("AdvertisementDeleting", (string)null);
                });

            modelBuilder.Entity("Pet4YouAPI.Models.AdvertisementInfo", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Breed")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.ToTable("AdvertisementInfos");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.AdvertisementLocation", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("Country")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("Region")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.HasKey("Id");

                    b.ToTable("AdvertisementLocations");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.OrderRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AdvertisementId")
                        .HasColumnType("int");

                    b.Property<string>("Message")
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<string>("Status")
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AdvertisementId");

                    b.HasIndex("UserId");

                    b.ToTable("OrderRequests");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RaterUserId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("RatingDate")
                        .HasColumnType("datetime");

                    b.Property<int?>("RecipientUserId")
                        .HasColumnType("int");

                    b.Property<short?>("Score")
                        .HasColumnType("smallint");

                    b.HasKey("Id");

                    b.HasIndex("RaterUserId");

                    b.HasIndex("RecipientUserId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Admin")
                        .HasColumnType("bit");

                    b.Property<bool>("Banned")
                        .HasColumnType("bit");

                    b.Property<bool>("Deleted")
                        .HasColumnType("bit");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(60)
                        .IsUnicode(false)
                        .HasColumnType("varchar(60)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(150)
                        .IsUnicode(false)
                        .HasColumnType("varchar(150)");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.UserInfo", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Biography")
                        .HasMaxLength(1500)
                        .HasColumnType("nvarchar(1500)");

                    b.Property<DateTime?>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("FirstName")
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<string>("LastName")
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<string>("PatronymicName")
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<string>("Phone")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("ProfileImageSource")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Sex")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("Id");

                    b.ToTable("UserInfo", (string)null);
                });

            modelBuilder.Entity("Pet4YouAPI.Models.Advertisement", b =>
                {
                    b.HasOne("Pet4YouAPI.Models.User", "User")
                        .WithMany("Advertisements")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("User");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.AdvertisementDeleting", b =>
                {
                    b.HasOne("Pet4YouAPI.Models.User", "AdminUser")
                        .WithMany()
                        .HasForeignKey("AdminUserId");

                    b.HasOne("Pet4YouAPI.Models.Advertisement", "Advertisement")
                        .WithMany("AdvertisementDeletings")
                        .HasForeignKey("AdvertisementId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("AdminUser");

                    b.Navigation("Advertisement");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.AdvertisementInfo", b =>
                {
                    b.HasOne("Pet4YouAPI.Models.Advertisement", "Advertisement")
                        .WithOne("AdvertisementInfo")
                        .HasForeignKey("Pet4YouAPI.Models.AdvertisementInfo", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Advertisement");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.AdvertisementLocation", b =>
                {
                    b.HasOne("Pet4YouAPI.Models.Advertisement", "IdNavigation")
                        .WithOne("AdvertisementLocation")
                        .HasForeignKey("Pet4YouAPI.Models.AdvertisementLocation", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IdNavigation");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.OrderRequest", b =>
                {
                    b.HasOne("Pet4YouAPI.Models.Advertisement", "Advertisement")
                        .WithMany("OrderRequests")
                        .HasForeignKey("AdvertisementId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Pet4YouAPI.Models.User", "User")
                        .WithMany("OrderRequests")
                        .HasForeignKey("UserId");

                    b.Navigation("Advertisement");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.Rating", b =>
                {
                    b.HasOne("Pet4YouAPI.Models.User", "RaterUser")
                        .WithMany("RatingRaterUsers")
                        .HasForeignKey("RaterUserId");

                    b.HasOne("Pet4YouAPI.Models.User", "RecipientUser")
                        .WithMany("RatingRecipientUsers")
                        .HasForeignKey("RecipientUserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("RaterUser");

                    b.Navigation("RecipientUser");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.UserInfo", b =>
                {
                    b.HasOne("Pet4YouAPI.Models.User", "User")
                        .WithOne("UserInfo")
                        .HasForeignKey("Pet4YouAPI.Models.UserInfo", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.Advertisement", b =>
                {
                    b.Navigation("AdvertisementDeletings");

                    b.Navigation("AdvertisementInfo");

                    b.Navigation("AdvertisementLocation");

                    b.Navigation("OrderRequests");
                });

            modelBuilder.Entity("Pet4YouAPI.Models.User", b =>
                {
                    b.Navigation("Advertisements");

                    b.Navigation("OrderRequests");

                    b.Navigation("RatingRaterUsers");

                    b.Navigation("RatingRecipientUsers");

                    b.Navigation("UserInfo");
                });
#pragma warning restore 612, 618
        }
    }
}
